/**
 * @description Unit tests for PEPPOL-EN16931-R041 (base amount when percentage provided).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931R041 } from './peppol-en16931-r041';

describe('PEPPOL-EN16931-R041 (base amount when percentage provided)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R041(document).passed).toEqual(true);
  });

  it('fails when a multiplier factor is present without a base amount', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      allowanceCharges: [{ amount: { currencyId: 'EUR', value: 20 }, chargeIndicator: false, multiplierFactorNumeric: 10 }],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R041(altered).passed).toEqual(false);
  });

  it('R040 should pass on the allowance example', async () => {
    const document = await decodeFixture(fixtures.allowance);
    expect(validatePeppolEn16931R041(document).passed).toEqual(true);
  });
});
