/**
 * @description Unit tests for CEN-EN16931-BR-AF-08.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrAf08 } from './cen-en16931-br-af-08';

describe('CEN-EN16931-BR-AF-08', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrAf08(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].item.classifiedTaxCategory.id = 'L';
    document.taxTotals = [
      {
        taxAmount: { currencyId: 'EUR', value: 0 },
        taxSubtotals: [
          {
            taxAmount: { currencyId: 'EUR', value: 0 },
            taxableAmount: { currencyId: 'EUR', value: 50 },
            taxCategory: { id: 'L', percent: 0, taxExemptionReason: undefined, taxExemptionReasonCode: undefined, taxSchemeId: { id: 'VAT' } },
          },
        ],
      },
    ];
    expect(validateCenEn16931BrAf08(document).passed).toEqual(false);
  });
});
