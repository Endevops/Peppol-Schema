/**
 * @description Unit tests for PEPPOL-EN16931-CL007 (currency code).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931CL007 } from './peppol-en16931-cl007';

describe('PEPPOL-EN16931-CL007 (currency code)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931CL007(document).passed).toEqual(true);
  });

  it('fails for an unsupported currency code', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, documentCurrencyCode: 'XYZ' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931CL007(altered).passed).toEqual(false);
  });
});
