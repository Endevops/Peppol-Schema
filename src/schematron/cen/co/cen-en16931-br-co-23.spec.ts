/**
 * @description Unit tests for CEN-EN16931-BR-CO-23.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo23 } from './cen-en16931-br-co-23';

describe('CEN-EN16931-BR-CO-23', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo23(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].allowanceCharges = [
      {
        allowanceChargeReason: undefined,
        allowanceChargeReasonCode: undefined,
        amount: { currencyId: 'EUR', value: 5 },
        baseAmount: undefined,
        chargeIndicator: false,
      },
    ];
    expect(validateCenEn16931BrCo23(document).passed).toEqual(false);
  });
});
