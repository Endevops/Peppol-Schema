/**
 * @description Unit tests for DE-R-001 (German payment instructions).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR001 } from './de-r-001';

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

describe('DE-R-001 (German payment instructions)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR001(document).passed).toEqual(true);
  });

  it('fails when both parties are German and no payment means is provided', async () => {
    const document = await withCountry(await decodeBaseExample(), 'DE', 'DE');
    const altered = { ...document, paymentMeans: undefined } as unknown as PeppolDocument;
    expect(validateDeR001(altered).passed).toEqual(false);
  });

  it('passes when both parties are German and payment means are provided', async () => {
    const document = await withCountry(await decodeBaseExample(), 'DE', 'DE');
    expect(validateDeR001(document).passed).toEqual(true);
  });
});
