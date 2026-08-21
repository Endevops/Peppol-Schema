/**
 * @description Unit tests for PEPPOL-COMMON-R052 (Danish chamber of commerce, scheme 0096).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR052 } from './peppol-common-r052';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R052 (Danish chamber of commerce, scheme 0096)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR052(document).passed).toEqual(true);
  });

  it('passes for a valid 10-digit number', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0096', '1234567890');
    expect(validatePeppolCommonR052(document).passed).toEqual(true);
  });

  it('fails for an invalid number', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0096', '123');
    expect(validatePeppolCommonR052(document).passed).toEqual(false);
  });
});
