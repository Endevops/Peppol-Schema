/**
 * @description Unit tests for PEPPOL-EN16931-CL008 (electronic address scheme).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931CL008 } from './peppol-en16931-cl008';

describe('PEPPOL-EN16931-CL008 (electronic address scheme)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931CL008(document).passed).toEqual(true);
  });

  it('fails for an unsupported scheme ID', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id: '123', schemeId: '9999' } },
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931CL008(altered).passed).toEqual(false);
  });
});
