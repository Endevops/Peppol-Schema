/**
 * @description Unit tests for CEN-EN16931-BR-37.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br37 } from './cen-en16931-br-37';

describe('CEN-EN16931-BR-37', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br37(document).passed).toEqual(true);
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
        taxCategory: undefined,
      },
    ];
    expect(validateCenEn16931Br37(document).passed).toEqual(false);
  });
});
