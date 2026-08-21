/**
 * @description Unit tests for PEPPOL-COMMON-R043 (Belgian enterprise number, scheme 0208).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR043 } from './peppol-common-r043';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R043 (Belgian enterprise number, scheme 0208)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR043(document).passed).toEqual(true);
  });

  it('passes for a valid Belgian enterprise number', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0208', '0202190461');
    expect(validatePeppolCommonR043(document).passed).toEqual(true);
  });

  it('fails for an invalid Belgian enterprise number', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0208', '1234567890');
    expect(validatePeppolCommonR043(document).passed).toEqual(false);
  });
});
