/**
 * @description Unit tests for CEN-EN16931-BR-DEC-01.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec01 } from './cen-en16931-br-dec-01';

describe('CEN-EN16931-BR-DEC-01', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrDec01(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.allowanceCharges = [
      {
        allowanceChargeReason: undefined,
        allowanceChargeReasonCode: undefined,
        amount: { currencyId: 'EUR', value: 1.234 },
        baseAmount: undefined,
        chargeIndicator: false,
        taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
      },
    ];
    expect(validateCenEn16931BrDec01(document).passed).toEqual(false);
  });
});
