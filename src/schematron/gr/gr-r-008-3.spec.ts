/**
 * @description Unit tests for GR-R-008-3 (invoice url external reference).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR008_3 } from './gr-r-008-3';

async function asGreek(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'EL094259216', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'GR' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'EL094259216', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'GR' } },
    },
  } as unknown as PeppolDocument;
}

describe('GR-R-008-3 (invoice url external reference)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR008_3(document).passed).toEqual(true);
  });

  it('fails when a Greek invoice url has no external reference uri', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = {
      ...document,
      additionalDocumentReferences: [{ id: { id: 'a' }, documentDescription: '##INVOICE|URL##' }],
    } as unknown as PeppolDocument;
    expect(validateGrR008_3(altered).passed).toEqual(false);
  });

  it('passes when a Greek invoice url has an external reference uri', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = {
      ...document,
      additionalDocumentReferences: [
        { id: { id: 'a' }, documentDescription: '##INVOICE|URL##', attachment: { externalReference: { uri: 'https://example.com' } } },
      ],
    } as unknown as PeppolDocument;
    expect(validateGrR008_3(altered).passed).toEqual(true);
  });
});
