/**
 * @description Unit tests for PEPPOL-COMMON-R045 (Codice Fiscale, scheme 0210).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR045 } from './peppol-common-r045';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R045 (Codice Fiscale, scheme 0210)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR045(document).passed).toEqual(true);
  });

  it('passes for a valid 16-char CF', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0210', 'RSSMRA85M01H501Z');
    expect(validatePeppolCommonR045(document).passed).toEqual(true);
  });

  it('fails for an invalid CF', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0210', 'ABC');
    expect(validatePeppolCommonR045(document).passed).toEqual(false);
  });
});
