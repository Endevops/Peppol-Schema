/**
 * @description Unit tests for PEPPOL-EN16931-R005 (VAT accounting currency differs from invoice currency).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R005 } from './peppol-en16931-r005';

describe('PEPPOL-EN16931-R005 (VAT accounting currency differs from invoice currency)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R005(document).passed).toEqual(true);
  });

  it('fails when taxCurrencyCode equals documentCurrencyCode', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, taxCurrencyCode: document.documentCurrencyCode } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R005(altered).passed).toEqual(false);
  });
});
