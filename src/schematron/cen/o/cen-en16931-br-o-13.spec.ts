/**
 * @description Unit tests for CEN-EN16931-BR-O-13.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrO13 } from './cen-en16931-br-o-13';

describe('CEN-EN16931-BR-O-13', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrO13(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals[0].taxCategory = { ...document.taxTotals[0].taxSubtotals[0].taxCategory, id: 'O', percent: undefined };
    document.allowanceCharges = [
      {
        allowanceChargeReason: undefined,
        allowanceChargeReasonCode: undefined,
        amount: { currencyId: 'EUR', value: 10 },
        baseAmount: undefined,
        chargeIndicator: false,
        taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
      },
    ];
    expect(validateCenEn16931BrO13(document).passed).toEqual(false);
  });
});
