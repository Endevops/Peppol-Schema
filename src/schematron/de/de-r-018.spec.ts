/**
 * @description Unit tests for DE-R-018 (German skonto format).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR018 } from './de-r-018';

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

describe('DE-R-018 (German skonto format)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR018(document).passed).toEqual(true);
  });

  it('fails when both parties are German and the payment terms note does not match the skonto format', async () => {
    const document = await withCountry(await decodeBaseExample(), 'DE', 'DE');
    const altered = { ...document, paymentTerms: { note: '#NOT-A-SKONTO#' } } as unknown as PeppolDocument;
    expect(validateDeR018(altered).passed).toEqual(false);
  });

  it('passes when both parties are German and the payment terms note matches the skonto format', async () => {
    const document = await withCountry(await decodeBaseExample(), 'DE', 'DE');
    const altered = { ...document, paymentTerms: { note: '#SKONTO#TAGE=10#PROZENT=2.00#' } } as unknown as PeppolDocument;
    expect(validateDeR018(altered).passed).toEqual(true);
  });
});
