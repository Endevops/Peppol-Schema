/**
 * @description Unit tests for CEN-EN16931-BR-AF-09.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrAf09 } from './cen-en16931-br-af-09';

describe('CEN-EN16931-BR-AF-09', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrAf09(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals = [
      {
        taxAmount: { currencyId: 'EUR', value: 1 },
        taxSubtotals: [
          {
            taxAmount: { currencyId: 'EUR', value: 1 },
            taxableAmount: { currencyId: 'EUR', value: 100 },
            taxCategory: { id: 'L', percent: 0, taxExemptionReason: undefined, taxExemptionReasonCode: undefined, taxSchemeId: { id: 'VAT' } },
          },
        ],
      },
    ];
    expect(validateCenEn16931BrAf09(document).passed).toEqual(false);
  });
});
