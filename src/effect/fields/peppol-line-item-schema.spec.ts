// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolLineItemSchema } from './peppol-line-item-schema';

describe('peppolLineItemSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolLineItemSchema);
  const decode = testSchema.decoding();

  it('should parse a minimal line item', async () => {
    await decode.succeed({ name: 'Widget', classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } } });
  });

  it('should parse a line item with optional fields', async () => {
    await decode.succeed({
      name: 'Widget',
      description: 'A very nice widget',
      buyersItemIdentification: { id: '12345' },
      sellersItemIdentification: { id: '987323' },
      standardItemIdentification: { id: { id: '1234567890123', schemeId: '0088' } },
      originCountryCode: { identificationCode: 'GB' },
      commodityClassifications: [{ itemClassification: { id: '9873242', listId: 'AA' } }],
      classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
      additionalItemProperties: [{ name: 'Colour', value: 'Blue' }],
    });
  });

  it('should reject a line item without a name', async () => {
    await decode.fail({ classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } } }, 'Missing key\n  at ["name"]');
  });

  it('should reject a line item without a classified tax category', async () => {
    await decode.fail({ name: 'Widget' }, 'Missing key\n  at ["classifiedTaxCategory"]');
  });

  it('should reject a classified tax category without an id', async () => {
    await decode.fail(
      { name: 'Widget', classifiedTaxCategory: { percent: 20, taxSchemeId: { id: 'VAT' } } },
      'Missing key\n  at ["classifiedTaxCategory"]["id"]'
    );
  });

  it('should reject a standard item identification without a scheme id', async () => {
    await decode.fail(
      {
        name: 'Widget',
        standardItemIdentification: { id: { id: '1234567890123' } },
        classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
      },
      'Missing key\n  at ["standardItemIdentification"]["id"]["schemeId"]'
    );
  });
});
