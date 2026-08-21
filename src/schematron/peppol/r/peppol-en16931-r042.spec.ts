/**
 * @description Unit tests for PEPPOL-EN16931-R042 (percentage when base amount provided).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931R042 } from './peppol-en16931-r042';

describe('PEPPOL-EN16931-R042 (percentage when base amount provided)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R042(document).passed).toEqual(true);
  });

  it('fails when a base amount is present without a multiplier factor', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      allowanceCharges: [{ amount: { currencyId: 'EUR', value: 20 }, baseAmount: { currencyId: 'EUR', value: 200 }, chargeIndicator: false }],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R042(altered).passed).toEqual(false);
  });

  it('R040 should pass on the allowance example', async () => {
    const document = await decodeFixture(fixtures.allowance);
    expect(validatePeppolEn16931R042(document).passed).toEqual(true);
  });
});
