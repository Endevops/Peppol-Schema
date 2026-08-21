/**
 * @description Unit tests for GR-R-004-1 (Greek MARK number).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR004_1 } from './gr-r-004-1';

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

describe('GR-R-004-1 (Greek MARK number)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR004_1(document).passed).toEqual(true);
  });

  it('fails when a Greek supplier has no MARK number', async () => {
    const document = await withCountry(await decodeBaseExample(), 'GR', 'BE');
    expect(validateGrR004_1(document).passed).toEqual(false);
  });

  it('passes when a Greek supplier has exactly one MARK number', async () => {
    const document = await withCountry(await decodeBaseExample(), 'GR', 'BE');
    const altered = {
      ...document,
      additionalDocumentReferences: [{ id: { id: '123' }, documentDescription: '##M.AR.K##' }],
    } as unknown as PeppolDocument;
    expect(validateGrR004_1(altered).passed).toEqual(true);
  });
});
