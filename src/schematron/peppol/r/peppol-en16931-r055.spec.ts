/**
 * @description Unit tests for PEPPOL-EN16931-R055 (same operational sign for VAT amounts).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R055 } from './peppol-en16931-r055';

describe('PEPPOL-EN16931-R055 (same operational sign for VAT amounts)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R055(document).passed).toEqual(true);
  });

  it('fails when the document currency and tax currency amounts have different signs', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      taxCurrencyCode: 'USD',
      taxTotals: [
        { taxAmount: { currencyId: 'EUR', value: 100 }, taxSubtotals: [] },
        { taxAmount: { currencyId: 'USD', value: -100 }, taxSubtotals: [] },
      ],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R055(altered).passed).toEqual(false);
  });
});
