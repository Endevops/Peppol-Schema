/**
 * @description Unit tests for PEPPOL-COMMON-R040 (GLN, scheme 0088).
 *
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolCommonR040 } from './peppol-common-r040';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R040 (GLN, scheme 0088)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR040(document).passed).toEqual(true);
  });

  it('passes for a valid GLN', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0088', '9482348239847239874');
    expect(validatePeppolCommonR040(document).passed).toEqual(true);
  });

  it('fails for an invalid GLN', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0088', '1234567890123');
    expect(validatePeppolCommonR040(document).passed).toEqual(false);
  });

  it('PEPPOL-COMMON-R040 should pass when no GLN identifiers are present', async () => {
    const document = await decodeFixture(fixtures.creditNote);
    expect(validatePeppolCommonR040(document).passed).toEqual(true);
  });
});
