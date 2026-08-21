/**
 * @description Unit tests for CEN-EN16931-BR-DEC-05.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec05 } from './cen-en16931-br-dec-05';

describe('CEN-EN16931-BR-DEC-05', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrDec05(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.allowanceCharges = [
      {
        allowanceChargeReason: undefined,
        allowanceChargeReasonCode: undefined,
        amount: { currencyId: 'EUR', value: 1.234 },
        baseAmount: undefined,
        chargeIndicator: true,
        taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
      },
    ];
    expect(validateCenEn16931BrDec05(document).passed).toEqual(false);
  });
});
