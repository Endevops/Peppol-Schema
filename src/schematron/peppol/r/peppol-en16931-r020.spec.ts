/**
 * @description Unit tests for PEPPOL-EN16931-R020 (seller electronic address).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R020 } from './peppol-en16931-r020';

describe('PEPPOL-EN16931-R020 (seller electronic address)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R020(document).passed).toEqual(true);
  });

  it('fails when the supplier endpoint is missing', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: undefined },
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R020(altered).passed).toEqual(false);
  });

  it('fails when the supplier endpoint id is blank', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id: '', schemeId: '0088' } },
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R020(altered).passed).toEqual(false);
  });
});
