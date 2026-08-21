/**
 * @description Unit tests for PEPPOL-COMMON-R047 (Italian VAT, scheme 0211).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR047 } from './peppol-common-r047';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R047 (Italian VAT, scheme 0211)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR047(document).passed).toEqual(true);
  });

  it('fails for an invalid Italian VAT', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0211', 'IT123');
    expect(validatePeppolCommonR047(document).passed).toEqual(false);
  });
});
