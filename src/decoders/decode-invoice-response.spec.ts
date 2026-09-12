import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeInvoiceResponse } from './decode-invoice-response';

const base = {
  'ubl:ApplicationResponse': {
    'cac:DocumentResponse': {
      'cac:DocumentReference': { 'cbc:DocumentTypeCode': 'X', 'cbc:ID': 'D', 'cbc:IssueDate': 'd' },
      'cac:Response': {
        'cac:Status': [
          {
            'cbc:StatusReason': 'reason',
            'cbc:StatusReasonCode': { '#text': '3', '@listID': 'list' } as { '#text': string; '@listID'?: string } | string | number,
            'cac:Condition': [{ 'cbc:AttributeID': 'a', 'cbc:Description': 'cond' }],
          },
        ],
        'cbc:EffectiveDate': 'd',
        'cbc:ResponseCode': '1',
      },
    },
    'cac:ReceiverParty': { 'cbc:EndpointID': { '#text': 'R', '@schemeID': '3' } },
    'cac:SenderParty': { 'cbc:EndpointID': { '#text': 'S', '@schemeID': '0' } },
    'cbc:CustomizationID': 'c',
    'cbc:ID': 'id',
    'cbc:IssueDate': 'd',
    'cbc:IssueTime': 't',
    'cbc:Note': 'n',
    'cbc:ProfileID': 'p',
  },
};

const clone = (o: unknown) => JSON.parse(JSON.stringify(o)) as typeof base;

describe('decodeInvoiceResponse', () => {
  it('handles an undefined value (root fallback and missing DocumentResponse)', () => {
    const out = Effect.runSync(decodeInvoiceResponse(undefined));
    expect(out.id).toBeUndefined();
    expect(out.documentResponse).toBeUndefined();
  });

  it('returns undefined for missing children of a present DocumentResponse', () => {
    const out = Effect.runSync(decodeInvoiceResponse({ 'ubl:ApplicationResponse': { 'cac:DocumentResponse': {} } } as never));
    expect(out.documentResponse).toEqual({ documentReference: undefined, issuerParty: undefined, recipientParty: undefined, response: undefined });
  });

  it('decodes an object status reason code with a list id', () => {
    const out = Effect.runSync(decodeInvoiceResponse(base as never));
    expect(out.documentResponse?.response?.status?.[0]?.statusReasonCode).toEqual({ listId: 'list', value: '3' });
  });

  it('decodes a string status reason code', () => {
    const doc = clone(base);
    doc['ubl:ApplicationResponse']['cac:DocumentResponse']['cac:Response']['cac:Status'][0]!['cbc:StatusReasonCode'] = '3';
    expect(Effect.runSync(decodeInvoiceResponse(doc)).documentResponse?.response?.status?.[0]?.statusReasonCode).toEqual({ value: '3' });
  });

  it('decodes a numeric status reason code', () => {
    const doc = clone(base);
    doc['ubl:ApplicationResponse']['cac:DocumentResponse']['cac:Response']['cac:Status'][0]!['cbc:StatusReasonCode'] = 3;
    expect(Effect.runSync(decodeInvoiceResponse(doc)).documentResponse?.response?.status?.[0]?.statusReasonCode).toEqual({ value: '3' });
  });

  it('returns undefined for an empty status reason code value', () => {
    const doc = clone(base);
    doc['ubl:ApplicationResponse']['cac:DocumentResponse']['cac:Response']['cac:Status'][0]!['cbc:StatusReasonCode'] = { '#text': '' };
    expect(Effect.runSync(decodeInvoiceResponse(doc)).documentResponse?.response?.status?.[0]?.statusReasonCode).toBeUndefined();
  });
});
