/**
 * @description Unit tests for PEPPOL-EN16931-R040 (amount = base amount * percentage/100).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931R040 } from './peppol-en16931-r040';

describe('PEPPOL-EN16931-R040 (amount = base amount * percentage/100)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R040(document).passed).toEqual(true);
  });

  it('fails when amount does not match base amount * percentage/100', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      allowanceCharges: [
        {
          amount: { currencyId: 'EUR', value: 100 },
          baseAmount: { currencyId: 'EUR', value: 200 },
          chargeIndicator: false,
          multiplierFactorNumeric: 10,
        },
      ],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R040(altered).passed).toEqual(false);
  });

  it('R040 should pass on the allowance example', async () => {
    const document = await decodeFixture(fixtures.allowance);
    expect(validatePeppolEn16931R040(document).passed).toEqual(true);
  });
});
