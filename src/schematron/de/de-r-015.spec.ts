/**
 * @description Unit tests for DE-R-015 (German buyer reference).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR015 } from './de-r-015';

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

describe('DE-R-015 (German buyer reference)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR015(document).passed).toEqual(true);
  });

  it('fails when both parties are German and no buyer reference is provided', async () => {
    const document = await withCountry(await decodeBaseExample(), 'DE', 'DE');
    const altered = { ...document, buyerReference: undefined } as unknown as PeppolDocument;
    expect(validateDeR015(altered).passed).toEqual(false);
  });
});
