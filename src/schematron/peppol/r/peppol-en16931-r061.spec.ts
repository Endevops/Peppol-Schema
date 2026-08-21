/**
 * @description Unit tests for PEPPOL-EN16931-R061 (mandate reference for direct debit).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture } from '#/test/test-utils';

import { validatePeppolEn16931R061 } from './peppol-en16931-r061';

describe('PEPPOL-EN16931-R061 (mandate reference for direct debit)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R061(document).passed).toEqual(true);
  });

  it('fails when a direct debit payment has no mandate reference', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '49' }, paymentMandate: { id: undefined } }],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R061(altered).passed).toEqual(false);
  });

  it('passes when a direct debit payment has a mandate reference', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '59' }, paymentMandate: { id: 'MANDATE-1' } }],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R061(altered).passed).toEqual(true);
  });

  it('R061 should pass on a credit note', async () => {
    const document = await decodeFixture('#/test/files/v3/credit-note/base-creditnote-correction.xml');
    expect(validatePeppolEn16931R061(document).passed).toEqual(true);
  });
});
