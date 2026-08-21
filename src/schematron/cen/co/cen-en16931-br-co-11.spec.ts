/**
 * @description Unit tests for CEN-EN16931-BR-CO-11.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo11 } from './cen-en16931-br-co-11';

describe('CEN-EN16931-BR-CO-11', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo11(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
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
    document.legalMonetaryTotal.allowanceTotalAmount = { currencyId: 'EUR', value: 5 };
    expect(validateCenEn16931BrCo11(document).passed).toEqual(false);
  });
});
