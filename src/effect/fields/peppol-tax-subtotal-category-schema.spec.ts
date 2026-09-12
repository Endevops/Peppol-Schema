// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolTaxSubtotalCategorySchema } from './peppol-tax-subtotal-category-schema';

describe('peppolTaxSubtotalCategorySchema', () => {
  const testSchema = new TestSchema.Asserts(peppolTaxSubtotalCategorySchema);
  const decode = testSchema.decoding();

  it('should parse with a tax exemption reason', async () => {
    await decode.succeed({ id: 'E', taxSchemeId: { id: 'VAT' }, taxExemptionReason: 'Exempt', taxExemptionReasonCode: 'VATEX-EU-132' });
  });

  it('should default the tax scheme id to VAT without exemption fields', async () => {
    await decode.succeed({ id: 'S', taxSchemeId: {} }, { id: 'S', taxSchemeId: { id: 'VAT' } });
  });

  it('should reject a missing id', async () => {
    await decode.fail({ taxSchemeId: {} }, 'Missing key\n  at ["id"]');
  });

  it('should reject an invalid tax category id', async () => {
    await decode.fail({ id: 'XX', taxSchemeId: {} }, 'Expected "AE" | "E" | "S" | "Z" | "G" | "O" | "K" | "L" | "M" | "B"\n  at ["id"]');
  });
});
