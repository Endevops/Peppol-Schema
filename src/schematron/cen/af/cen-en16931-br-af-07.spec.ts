/**
 * @description Unit tests for CEN-EN16931-BR-AF-07.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrAf07 } from './cen-en16931-br-af-07';

describe('CEN-EN16931-BR-AF-07', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrAf07(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.allowanceCharges = [
      {
        allowanceChargeReason: undefined,
        allowanceChargeReasonCode: undefined,
        amount: { currencyId: 'EUR', value: 10 },
        baseAmount: undefined,
        chargeIndicator: true,
        taxCategory: { id: 'L', percent: -1, taxSchemeId: { id: 'VAT' } },
      },
    ];
    expect(validateCenEn16931BrAf07(document).passed).toEqual(false);
  });
});
