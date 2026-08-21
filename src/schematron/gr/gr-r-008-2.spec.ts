/**
 * @description Unit tests for GR-R-008-2 (no more than one invoice url).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR008_2 } from './gr-r-008-2';

async function withCountry(
  document: PeppolDocument,
  supplierCountry: string,
  customerCountry: string,
  supplierVatPrefix = `${supplierCountry}VAT123456789`,
  customerVatPrefix = `${customerCountry}VAT123456789`
): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: supplierVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: supplierCountry } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: customerVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: customerCountry } },
    },
  } as unknown as PeppolDocument;
}

describe('GR-R-008-2 (no more than one invoice url)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR008_2(document).passed).toEqual(true);
  });

  it('fails when a Greek supplier has two invoice urls', async () => {
    const document = await withCountry(await decodeBaseExample(), 'GR', 'BE');
    const altered = {
      ...document,
      additionalDocumentReferences: [
        { id: { id: 'a' }, documentDescription: '##INVOICE|URL##' },
        { id: { id: 'b' }, documentDescription: '##INVOICE|URL##' },
      ],
    } as unknown as PeppolDocument;
    expect(validateGrR008_2(altered).passed).toEqual(false);
  });
});
