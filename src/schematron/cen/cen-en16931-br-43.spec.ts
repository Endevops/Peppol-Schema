/**
 * @description Unit tests for CEN-EN16931-BR-43.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br43 } from './cen-en16931-br-43';

describe('CEN-EN16931-BR-43', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br43(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].allowanceCharges = [
      { allowanceChargeReason: undefined, allowanceChargeReasonCode: undefined, amount: undefined, baseAmount: undefined, chargeIndicator: true },
    ];
    expect(validateCenEn16931Br43(document).passed).toEqual(false);
  });
});
