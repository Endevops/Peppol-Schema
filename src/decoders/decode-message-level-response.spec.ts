import { describe, expect, it } from 'vitest';

import { decodeMessageLevelResponse } from './decode-message-level-response';

describe('decodeMessageLevelResponse', () => {
  it('handles an undefined value', () => {
    const out = decodeMessageLevelResponse(undefined);
    expect(out.id).toBeUndefined();
    expect(out.documentResponse).toBeUndefined();
  });

  it('returns undefined for each missing child of a present DocumentResponse', () => {
    const out = decodeMessageLevelResponse({ 'ubl:ApplicationResponse': { 'cac:DocumentResponse': {} } } as never);
    expect(out.documentResponse).toEqual({ documentReference: undefined, lineResponse: [], response: undefined });
  });

  it('returns undefined for a LineResponse entry without a Response', () => {
    const out = decodeMessageLevelResponse({ 'ubl:ApplicationResponse': { 'cac:DocumentResponse': { 'cac:LineResponse': [{}] } } } as never);
    expect(out.documentResponse?.lineResponse?.[0]).toEqual({ lineReference: { lineId: undefined }, response: undefined });
  });

  it('decodes a fully populated DocumentResponse', () => {
    const out = decodeMessageLevelResponse({
      'ubl:ApplicationResponse': {
        'cbc:CustomizationID': 'cid',
        'cbc:ProfileID': 'mlr',
        'cbc:ID': 'id1',
        'cbc:IssueDate': '2024-01-01',
        'cbc:IssueTime': '10:00:00Z',
        'cac:DocumentResponse': {
          'cac:DocumentReference': { 'cbc:ID': 'DR1', 'cbc:DocumentTypeCode': 'X', 'cbc:VersionID': '1' },
          'cac:Response': { 'cbc:Description': 'ok', 'cbc:ResponseCode': '1' },
          'cac:LineResponse': [
            {
              'cac:LineReference': { 'cbc:LineID': 'L1' },
              'cac:Response': { 'cbc:Description': 'd', 'cbc:ResponseCode': '1', 'cac:Status': { 'cbc:StatusReasonCode': 'SR' } },
            },
          ],
        },
        'cac:SenderParty': { 'cbc:EndpointID': { '#text': 'S1', '@schemeID': '0' } },
        'cac:ReceiverParty': { 'cbc:EndpointID': { '#text': 'R1', '@schemeID': '3' } },
      },
    } as never);
    expect(out.documentResponse?.documentReference?.id).toBe('DR1');
    expect(out.documentResponse?.response?.responseCode).toBe('1');
    expect(out.documentResponse?.lineResponse?.[0]?.lineReference?.lineId).toBe('L1');
    expect(out.documentResponse?.lineResponse?.[0]?.response?.status?.statusReasonCode).toBe('SR');
    expect(out.senderParty?.endpointId?.id).toBe('S1');
    expect(out.receiverParty?.endpointId?.id).toBe('R1');
  });
});
