/**
 * @description Unit tests for PEPPOL-COMMON-R046 (Codice Fiscale, scheme 9907).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR046 } from './peppol-common-r046';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R046 (Codice Fiscale, scheme 9907)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR046(document).passed).toEqual(true);
  });

  it('fails for an invalid CF', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '9907', 'ABC');
    expect(validatePeppolCommonR046(document).passed).toEqual(false);
  });
});
