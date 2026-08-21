/**
 * @description Unit tests for PEPPOL-EN16931-R054 (only one tax total without subtotals when tax currency).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R054 } from './peppol-en16931-r054';

describe('PEPPOL-EN16931-R054 (only one tax total without subtotals when tax currency)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R054(document).passed).toEqual(true);
  });

  it('fails when a tax total without subtotals is present without a tax currency code', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      taxTotals: [...document.taxTotals, { taxAmount: { currencyId: 'USD', value: 10 }, taxSubtotals: undefined }],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R054(altered).passed).toEqual(false);
  });
});
