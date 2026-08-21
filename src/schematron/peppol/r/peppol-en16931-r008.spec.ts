/**
 * @description Unit tests for PEPPOL-EN16931-R008 (no empty elements).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R008 } from './peppol-en16931-r008';

describe('PEPPOL-EN16931-R008 (no empty elements)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R008(document).passed).toEqual(true);
  });

  it('fails when the document contains an empty element', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, buyerReference: '   ' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R008(altered).passed).toEqual(false);
  });
});
