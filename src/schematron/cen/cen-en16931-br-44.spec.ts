/**
 * @description Unit tests for CEN-EN16931-BR-44.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br44 } from './cen-en16931-br-44';

describe('CEN-EN16931-BR-44', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br44(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].allowanceCharges = [
      {
        allowanceChargeReason: undefined,
        allowanceChargeReasonCode: undefined,
        amount: { currencyId: 'EUR', value: 5 },
        baseAmount: undefined,
        chargeIndicator: true,
      },
    ];
    expect(validateCenEn16931Br44(document).passed).toEqual(false);
  });
});
