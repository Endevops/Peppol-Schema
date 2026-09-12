import { DateTime } from 'effect';
// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolInvoiceResponseDocumentActualResponseSchema } from './peppol-invoice-response-document-actual-response-schema';

describe('peppolInvoiceResponseDocumentActualResponseSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolInvoiceResponseDocumentActualResponseSchema);
  const decode = testSchema.decoding();

  it('should decode a response code that requires clarification with a status', async () => {
    await decode.succeed(
      { responseCode: 'RE', effectiveDate: '2018-09-24', status: [{ statusReason: 'VAT Reference not found' }] },
      { responseCode: 'RE', effectiveDate: DateTime.makeUnsafe('2018-09-24'), status: [{ statusReason: 'VAT Reference not found' }] }
    );
  });

  it('should decode a response code that does not require clarification without a status', async () => {
    await decode.succeed({ responseCode: 'AP' });
  });

  it('should decode a response code that does not require clarification with an optional status', async () => {
    await decode.succeed({ responseCode: 'AB', status: [{ statusReason: 'Accepted with warnings' }] });
  });

  it('should reject a response code that requires clarification without a status', async () => {
    await decode.fail({ responseCode: 'RE' }, 'Missing key\n  at ["status"]\nExpected "AB" | "AP" | "IP" | "PD"\n  at ["responseCode"]');
  });

  it('should reject a response code that requires clarification with an empty status', async () => {
    await decode.fail(
      { responseCode: 'RE', status: [] },
      'Expected a value with a length of at least 1\n  at ["status"]\nExpected "AB" | "AP" | "IP" | "PD"\n  at ["responseCode"]'
    );
  });

  it('should reject an unknown response code', async () => {
    await decode.fail(
      { responseCode: 'ZZ' },
      'Expected "UQ" | "RE" | "CA"\n  at ["responseCode"]\nExpected "AB" | "AP" | "IP" | "PD"\n  at ["responseCode"]'
    );
  });

  it('should reject an invalid effective date', async () => {
    await decode.fail(
      { responseCode: 'AP', effectiveDate: 'not-a-date' },
      'Expected "UQ" | "RE" | "CA"\n  at ["responseCode"]\nExpected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}Z?$\n  at ["effectiveDate"]'
    );
  });
});
