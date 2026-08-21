/**
 * @description Unit tests for PEPPOL-EN16931-R004 (specification identifier).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R004 } from './peppol-en16931-r004';

describe('PEPPOL-EN16931-R004 (specification identifier)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R004(document).passed).toEqual(true);
  });

  it('R004 should fail when customizationId has a wrong prefix', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R004({ ...document, customizationId: 'urn:wrong' }).passed).toEqual(false);
  });

  it('passes when the customization id matches the compliant prefix', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R004(document).passed).toEqual(true);
  });

  it('fails when the customization id does not match the compliant prefix', async () => {
    const document = { ...(await decodeBaseExample()), customizationId: 'urn:something-else' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R004(document).passed).toEqual(false);
  });
});
