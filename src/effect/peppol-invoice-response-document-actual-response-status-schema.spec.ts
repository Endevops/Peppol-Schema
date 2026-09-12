// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolInvoiceResponseDocumentActualResponseStatusSchema } from './peppol-invoice-response-document-actual-response-status-schema';

describe('peppolInvoiceResponseDocumentActualResponseStatusSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolInvoiceResponseDocumentActualResponseStatusSchema);
  const decode = testSchema.decoding();

  it('should decode an empty status', async () => {
    await decode.succeed({});
  });

  it('should decode a fully populated status', async () => {
    await decode.succeed({
      statusReasonCode: { value: 'NOA', listId: 'OPStatusAction' },
      statusReason: 'VAT Reference not found',
      condition: [{ attributeId: 'BT-48', description: 'EU123456789' }],
    });
  });

  it('should decode a status with a condition without a description', async () => {
    await decode.succeed({ condition: [{ attributeId: 'BT-48' }] });
  });

  it('should reject a condition without a required attribute id', async () => {
    await decode.fail({ condition: [{}] }, 'Missing key\n  at ["condition"][0]["attributeId"]');
  });
});
