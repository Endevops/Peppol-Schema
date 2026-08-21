/**
 * @description Unit tests for PEPPOL-EN16931-R053 (only one tax total with subtotals).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R053 } from './peppol-en16931-r053';

describe('PEPPOL-EN16931-R053 (only one tax total with subtotals)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R053(document).passed).toEqual(true);
  });

  it('R053 should fail with two tax totals containing subtotals', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, taxTotals: [...document.taxTotals, ...document.taxTotals] };
    expect(validatePeppolEn16931R053(altered).passed).toEqual(false);
  });

  it('passes when there is exactly one tax total with subtotals', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R053(document).passed).toEqual(true);
  });

  it('fails when there are two tax totals with subtotals', async () => {
    const document = await decodeBaseExample();
    const subtotal = document.taxTotals[0]?.taxSubtotals?.[0];
    const taxAmount = document.taxTotals[0]?.taxAmount;
    if (!subtotal || !taxAmount) {
      throw new Error('base example has no tax subtotal');
    }
    const altered = {
      ...document,
      taxTotals: [
        { taxAmount, taxSubtotals: [subtotal] },
        { taxAmount, taxSubtotals: [subtotal] },
      ],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R053(altered).passed).toEqual(false);
  });
});
