/**
 * @description Unit tests for PEPPOL-EN16931-R007 (business process format).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R007 } from './peppol-en16931-r007';

describe('PEPPOL-EN16931-R007 (business process format)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R007(document).passed).toEqual(true);
  });

  it('fails when profileId does not match the expected format', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, profileId: 'not-a-valid-profile' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R007(altered).passed).toEqual(false);
  });
});
