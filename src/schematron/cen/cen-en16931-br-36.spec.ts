/**
 * @description Unit tests for CEN-EN16931-BR-36.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br36 } from './cen-en16931-br-36';

describe('CEN-EN16931-BR-36', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br36(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.allowanceCharges = [
      {
        allowanceChargeReason: undefined,
        allowanceChargeReasonCode: undefined,
        amount: undefined,
        baseAmount: undefined,
        chargeIndicator: true,
        taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
      },
    ];
    expect(validateCenEn16931Br36(document).passed).toEqual(false);
  });
});
