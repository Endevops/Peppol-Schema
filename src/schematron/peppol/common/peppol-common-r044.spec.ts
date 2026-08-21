/**
 * @description Unit tests for PEPPOL-COMMON-R044 (IPA code, scheme 0201).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR044 } from './peppol-common-r044';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R044 (IPA code, scheme 0201)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR044(document).passed).toEqual(true);
  });

  it('passes for a valid 6-char IPA code', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0201', 'ABC123');
    expect(validatePeppolCommonR044(document).passed).toEqual(true);
  });

  it('fails for an invalid IPA code', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0201', 'AB');
    expect(validatePeppolCommonR044(document).passed).toEqual(false);
  });
});
