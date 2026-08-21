/**
 * @description Unit tests for NL-R-003 (Dutch legal entity identifier scheme).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR003 } from './nl-r-003';

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

describe('NL-R-003 (Dutch legal entity identifier scheme)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateNlR003(document).passed).toEqual(true);
  });

  it('fails when a Dutch supplier legal entity uses a wrong scheme', async () => {
    const document = await withCountry(await decodeBaseExample(), 'NL', 'BE');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '12345678', schemeId: '0196' } },
      },
    } as unknown as PeppolDocument;
    expect(validateNlR003(altered).passed).toEqual(false);
  });

  it('passes when a Dutch supplier legal entity uses scheme 0106', async () => {
    const document = await withCountry(await decodeBaseExample(), 'NL', 'BE');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '12345678', schemeId: '0106' } },
      },
    } as unknown as PeppolDocument;
    expect(validateNlR003(altered).passed).toEqual(true);
  });
});
