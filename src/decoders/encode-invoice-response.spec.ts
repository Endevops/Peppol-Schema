import { describe, expect, it } from '@effect/vitest';
import { Effect, Schema } from 'effect';

import { PeppolInvoiceResponse } from '#/schemas/peppol-invoice-response-schema.ts';

import { encodeInvoiceResponse } from './encode-invoice-response.ts';

describe('encodeInvoiceResponse', () => {
  const decodeInvoiceResponse = Schema.decodeSync(PeppolInvoiceResponse);
  const invoiceResponse = decodeInvoiceResponse({
    customizationId: 'urn:fdc:peppol.eu:poacc:trns:invoice_response:3',
    documentResponse: {
      documentReference: { documentTypeCode: '380', id: 'inv021', issueDate: '2018-09-22' },
      issuerParty: { partyIdentification: { id: '123456785', schemeId: '0192' }, partyName: { name: 'Test Company AS' } },
      response: {
        effectiveDate: '2018-09-24',
        responseCode: 'RE',
        status: [
          {
            condition: [{ attributeId: 'BT-48', description: 'EU123456789' }],
            statusReason: 'VAT Reference not found',
            statusReasonCode: { listId: 'OPStatusAction', value: 'NOA' },
          },
        ],
      },
    },
    id: 'imrid001',
    issueDate: '2017-12-01',
    issueTime: '12:00:00',
    note: 'text',
    profileId: 'urn:fdc:peppol.eu:poacc:bis:invoice_response:3',
    receiverParty: {
      endpointId: { id: '7330001000000', schemeId: '0088' },
      partyIdentification: { id: '987654325', schemeId: '0192' },
      partyLegalEntity: { registrationName: 'Seller company' },
    },
    senderParty: {
      contact: { electronicMail: 'jj@test-company.dk', name: 'Jens Jensen', telephone: '23232323' },
      endpointId: { id: '5798000012349', schemeId: '0088' },
      partyIdentification: { id: 'DK88776655', schemeId: '0184' },
      partyLegalEntity: { registrationName: 'Buyer organization' },
    },
  });

  it.effect(
    'should decode an invoice response',
    Effect.fn(function* () {
      const out = yield* encodeInvoiceResponse(invoiceResponse);
      expect(out).toMatchSnapshot('invoice-response');
    })
  );
});
