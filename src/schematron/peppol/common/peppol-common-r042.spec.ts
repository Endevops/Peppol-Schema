/**
 * @description Unit tests for PEPPOL-COMMON-R042 (Danish CVR, scheme 0184).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR042 } from './peppol-common-r042';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R042 (Danish CVR, scheme 0184)', () => {
  it('passes when no identifier uses the checked scheme', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolCommonR042(document).passed).toEqual(true);
  });

  it('passes for a valid 8-digit CVR', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0184', '12345678');
    expect(validatePeppolCommonR042(document).passed).toEqual(true);
  });

  it('fails for an invalid CVR', async () => {
    const document = await withEndpointId(await decodeBaseExample(), '0184', '12345');
    expect(validatePeppolCommonR042(document).passed).toEqual(false);
  });
});
