// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolInvoiceResponseStatusReasonCodeSchema } from './peppol-invoice-response-status-reason-code-schema';

describe('peppolInvoiceResponseStatusReasonCodeSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolInvoiceResponseStatusReasonCodeSchema);
  const decode = testSchema.decoding();

  it('should decode an operation status action code', async () => {
    await decode.succeed({ value: 'NOA', listId: 'OPStatusAction' });
  });

  it('should decode an operation status reason code', async () => {
    await decode.succeed({ value: 'NON', listId: 'OPStatusReason' });
  });

  it('should reject an action code tagged as a reason code', async () => {
    await decode.fail(
      { value: 'NOA', listId: 'OPStatusReason' },
      'Expected "NON" | "REF" | "LEG" | "REC" | "QUA" | "DEL" | "PRI" | "QTY" | "ITM" | "PAY" | "UNR" | "FIN" | "PPD" | "OTH"\n  at ["value"]'
    );
  });

  it('should reject an unknown action code', async () => {
    await decode.fail({ value: 'ZZZ', listId: 'OPStatusAction' }, 'Expected "NOA" | "PIN" | "NIN" | "CNF" | "CNP" | "CNA" | "OTH"\n  at ["value"]');
  });

  it('should reject a status reason code without a list id', async () => {
    await decode.fail({ value: 'NOA' }, 'Expected { readonly "listId": "OPStatusAction", ... } | { readonly "listId": "OPStatusReason", ... }');
  });

  it('should reject a status reason code without a value', async () => {
    await decode.fail({ listId: 'OPStatusAction' }, 'Missing key\n  at ["value"]');
  });
});
