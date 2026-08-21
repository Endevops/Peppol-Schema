/**
 * @description Unit tests for PEPPOL-EN16931-P0101 (credit note type code per profile).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931P0101 } from './peppol-en16931-p0101';

async function asCreditNote(document: PeppolDocument): Promise<PeppolDocument> {
  return { ...document, creditNoteLines: [{ id: '1' }], creditNoteTypeCode: '381' } as unknown as PeppolDocument;
}

describe('PEPPOL-EN16931-P0101 (credit note type code per profile)', () => {
  it('passes when the document is not a credit note', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931P0101(document).passed).toEqual(true);
  });

  it('passes when profile 01 uses a supported credit note type code', async () => {
    const document = await asCreditNote(await decodeBaseExample());
    expect(validatePeppolEn16931P0101(document).passed).toEqual(true);
  });

  it('fails when profile 01 uses an unsupported credit note type code', async () => {
    const document = await asCreditNote(await decodeBaseExample());
    const altered = { ...document, creditNoteTypeCode: '999' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931P0101(altered).passed).toEqual(false);
  });

  it('passes when the profile is not 01', async () => {
    const document = await asCreditNote(await decodeBaseExample());
    const altered = { ...document, profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:06:1.0' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931P0101(altered).passed).toEqual(true);
  });
});
