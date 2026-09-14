import { describe, expect, it } from '@effect/vitest';
import { Effect, Schema } from 'effect';

import { decodeInvoiceResponse } from './decode-invoice-response.ts';

describe('decodeInvoiceResponse()', () => {
  it.effect(
    'should decode a valid invoice response',
    Effect.fn(function* () {
      const value = yield* decodeInvoiceResponse({
        ApplicationResponse: {
          'cac:DocumentResponse': {
            'cac:DocumentReference': { 'cbc:DocumentTypeCode': '380', 'cbc:ID': 'inv021', 'cbc:IssueDate': '2018-09-22' },
            'cac:IssuerParty': {
              'cac:Contact': undefined,
              'cac:PartyIdentification': { 'cbc:ID': { '#text': '123456785', '@schemeID': '0192' } },
              'cac:PartyLegalEntity': undefined,
              'cac:PartyName': { 'cbc:Name': 'Test Company AS' },
              'cbc:EndpointID': undefined,
            },
            'cac:RecipientParty': undefined,
            'cac:Response': {
              'cac:Status': [
                {
                  'cac:Condition': [{ 'cbc:AttributeID': 'BT-48', 'cbc:Description': 'EU123456789' }],
                  'cbc:StatusReason': 'VAT Reference not found',
                  'cbc:StatusReasonCode': { '#text': 'NOA', '@listID': 'OPStatusAction' },
                },
              ],
              'cbc:EffectiveDate': '2018-09-24',
              'cbc:ResponseCode': 'RE',
            },
          },
          'cac:ReceiverParty': {
            'cac:Contact': undefined,
            'cac:PartyIdentification': { 'cbc:ID': { '#text': '987654325', '@schemeID': '0192' } },
            'cac:PartyLegalEntity': { 'cbc:CompanyID': undefined, 'cbc:CompanyLegalForm': undefined, 'cbc:RegistrationName': 'Seller company' },
            'cac:PartyName': undefined,
            'cbc:EndpointID': { '#text': '7330001000000', '@schemeID': '0088' },
          },
          'cac:SenderParty': {
            'cac:Contact': { 'cbc:ElectronicMail': 'jj@test-company.dk', 'cbc:Name': 'Jens Jensen', 'cbc:Telephone': '23232323' },
            'cac:PartyIdentification': { 'cbc:ID': { '#text': 'DK88776655', '@schemeID': '0184' } },
            'cac:PartyLegalEntity': { 'cbc:CompanyID': undefined, 'cbc:CompanyLegalForm': undefined, 'cbc:RegistrationName': 'Buyer organization' },
            'cac:PartyName': undefined,
            'cbc:EndpointID': { '#text': '5798000012349', '@schemeID': '0088' },
          },
          'cbc:CustomizationID': 'urn:fdc:peppol.eu:poacc:trns:invoice_response:3',
          'cbc:ID': 'imrid001',
          'cbc:IssueDate': '2017-12-01',
          'cbc:IssueTime': '00:00:00',
          'cbc:Note': 'text',
          'cbc:ProfileID': 'urn:fdc:peppol.eu:poacc:bis:invoice_response:3',
        },
      }).pipe(Effect.mapError(cause => new Schema.SchemaError(cause)));
      expect(value).toMatchSnapshot('invoice-response');
    })
  );
});
