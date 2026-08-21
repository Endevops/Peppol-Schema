/**
 * @description Unit tests for PEPPOL-COMMON-R049 (Swedish org number, scheme 0007).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR049 } from './peppol-common-r049';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R049 (Swedish org number, scheme 0007)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR049(document).passed).toEqual(true);
  });

  it('passes for a valid Swedish org number', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0007', '5561234567');
    expect(validatePeppolCommonR049(document).passed).toEqual(true);
  });

  it('fails for an invalid Swedish org number', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0007', '123');
    expect(validatePeppolCommonR049(document).passed).toEqual(false);
  });
});
