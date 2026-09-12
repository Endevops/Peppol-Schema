// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolTaxCategorySchema } from './peppol-tax-category-schema';

describe('peppolTaxCategorySchema', () => {
  const testSchema = new TestSchema.Asserts(peppolTaxCategorySchema);
  const decode = testSchema.decoding();

  it('should parse a tax category', async () => {
    await decode.succeed({ id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } });
  });

  it('should default the tax scheme id to VAT', async () => {
    await decode.succeed({ id: 'S', taxSchemeId: {} }, { id: 'S', taxSchemeId: { id: 'VAT' } });
  });

  it('should reject a missing id', async () => {
    await decode.fail({ taxSchemeId: {} }, 'Missing key\n  at ["id"]');
  });

  it('should reject an invalid tax category id', async () => {
    await decode.fail({ id: 'XX', taxSchemeId: {} }, 'Expected "AE" | "E" | "S" | "Z" | "G" | "O" | "K" | "L" | "M" | "B"\n  at ["id"]');
  });

  it('should reject a missing taxSchemeId', async () => {
    await decode.fail({ id: 'S' }, 'Missing key\n  at ["taxSchemeId"]');
  });
});
