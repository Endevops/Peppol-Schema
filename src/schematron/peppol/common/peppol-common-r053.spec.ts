/**
 * @description Unit tests for PEPPOL-COMMON-R053 (Danish ERSTORG, scheme 0198).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR053 } from './peppol-common-r053';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R053 (Danish ERSTORG, scheme 0198)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR053(document).passed).toEqual(true);
  });

  it('passes for a valid DK-prefixed number', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0198', 'DK12345678');
    expect(validatePeppolCommonR053(document).passed).toEqual(true);
  });

  it('fails for an invalid number', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0198', '123');
    expect(validatePeppolCommonR053(document).passed).toEqual(false);
  });
});
