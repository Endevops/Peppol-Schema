// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolInvoiceResponseSchema } from './peppol-invoice-response-schema';

const validInvoiceResponse = {
  customizationId: 'urn:fdc:peppol.eu:poacc:trns:invoice_response:3',
  profileId: 'urn:fdc:peppol.eu:poacc:bis:invoice_response:3',
  id: 'imrid001',
  issueDate: '2017-12-01',
  issueTime: '12:00:00',
  senderParty: {
    endpointId: { id: '5798000012349', schemeId: '0088' },
    partyIdentification: { id: 'DK88776655', schemeId: '0184' },
    partyLegalEntity: { registrationName: 'Buyer organization' },
    contact: { name: 'Jens Jensen', telephone: '23232323', electronicMail: 'jj@test-company.dk' },
  },
  receiverParty: {
    endpointId: { id: '7330001000000', schemeId: '0088' },
    partyIdentification: { id: '987654325', schemeId: '0192' },
    partyLegalEntity: { registrationName: 'Seller company' },
  },
  note: 'Please refer to previous email exchange regarding this invoice.',
  documentResponse: {
    response: {
      responseCode: 'RE',
      effectiveDate: '2018-09-24',
      status: [
        {
          statusReasonCode: { value: 'NOA', listId: 'OPStatusAction' },
          statusReason: 'VAT Reference not found',
          condition: [{ attributeId: 'BT-48', description: 'EU123456789' }],
        },
      ],
    },
    documentReference: { id: 'inv021', issueDate: '2018-09-22', documentTypeCode: '380' },
    issuerParty: { partyIdentification: { id: '123456785', schemeId: '0192' }, partyName: { name: 'Test Company AS' } },
  },
};

describe('peppolInvoiceResponseSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolInvoiceResponseSchema);
  const decode = testSchema.decoding();

  it('should decode a valid invoice response', async () => {
    await decode.succeed(validInvoiceResponse);
  });

  it('should decode an invoice response without optional issue time and note', async () => {
    const { issueTime: _issueTime, note: _note, ...withoutOptionals } = validInvoiceResponse;
    await decode.succeed(withoutOptionals);
  });

  it('should reject an invoice response without required id', async () => {
    const { id: _id, ...noId } = validInvoiceResponse;
    await decode.fail(noId, 'Missing key\n  at ["id"]');
  });

  it('should reject an invoice response with a message level response profile id', async () => {
    await decode.fail(
      { ...validInvoiceResponse, profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3' },
      'Expected "urn:fdc:peppol.eu:poacc:bis:invoice_response:3"\n  at ["profileId"]'
    );
  });

  it('should reject an invoice response with an invalid issue time', async () => {
    await decode.fail({ ...validInvoiceResponse, issueTime: '25:00:00' }, 'Invalid ISO time\n  at ["issueTime"]');
  });

  it('should reject an invoice response with an unknown response code', async () => {
    await decode.fail(
      { ...validInvoiceResponse, documentResponse: { ...validInvoiceResponse.documentResponse, response: { responseCode: 'ZZ' } } },
      'Expected "UQ" | "RE" | "CA"\n  at ["documentResponse"]["response"]["responseCode"]\nExpected "AB" | "AP" | "IP" | "PD"\n  at ["documentResponse"]["response"]["responseCode"]'
    );
  });

  it('should reject an invoice response without a document reference', async () => {
    const { documentReference: _documentReference, ...withoutDocumentReference } = validInvoiceResponse.documentResponse;
    await decode.fail(
      { ...validInvoiceResponse, documentResponse: withoutDocumentReference },
      'Missing key\n  at ["documentResponse"]["documentReference"]'
    );
  });
});
