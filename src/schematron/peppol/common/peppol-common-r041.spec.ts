/**
 * @description Unit tests for PEPPOL-COMMON-R041 (Norwegian org number, scheme 0192).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR041 } from './peppol-common-r041';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R041 (Norwegian org number, scheme 0192)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR041(document).passed).toEqual(true);
  });

  it('fails for an invalid Norwegian org number', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0192', '123456789');
    expect(validatePeppolCommonR041(document).passed).toEqual(false);
  });
});
