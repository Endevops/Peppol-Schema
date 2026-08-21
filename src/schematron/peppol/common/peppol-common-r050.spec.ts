/**
 * @description Unit tests for PEPPOL-COMMON-R050 (Australian ABN, scheme 0151).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR050 } from './peppol-common-r050';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R050 (Australian ABN, scheme 0151)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR050(document).passed).toEqual(true);
  });

  it('passes for a valid ABN', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0151', '51824753556');
    expect(validatePeppolCommonR050(document).passed).toEqual(true);
  });

  it('fails for an invalid ABN', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0151', '12345678901');
    expect(validatePeppolCommonR050(document).passed).toEqual(false);
  });
});
