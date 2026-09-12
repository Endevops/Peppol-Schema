import { DateTime } from 'effect';
// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolBillingReferenceSchema } from './peppol-billing-reference-schema';

describe('peppolBillingReferenceSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolBillingReferenceSchema);
  const decode = testSchema.decoding();

  it('should parse a billing reference with an invoice document reference', async () => {
    await decode.succeed({ invoiceDocumentReference: { id: 'inv123' } });
  });

  it('should parse a billing reference with an issue date', async () => {
    await decode.succeed(
      { invoiceDocumentReference: { id: 'inv123', issueDate: '2017-09-15' } },
      { invoiceDocumentReference: { id: 'inv123', issueDate: DateTime.makeUnsafe('2017-09-15') } }
    );
  });

  it('should reject a billing reference without an invoice document reference', async () => {
    await decode.fail({}, 'Missing key\n  at ["invoiceDocumentReference"]');
  });

  it('should reject an invoice document reference without an id', async () => {
    await decode.fail({ invoiceDocumentReference: {} }, 'Missing key\n  at ["invoiceDocumentReference"]["id"]');
  });

  it('should reject an invalid issue date', async () => {
    await decode.fail(
      { invoiceDocumentReference: { id: 'inv123', issueDate: '15-09-2017' } },
      'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}Z?$\n  at ["invoiceDocumentReference"]["issueDate"]'
    );
  });
});
