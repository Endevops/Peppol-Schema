/**
 * @description Unit tests for NL-R-004 (Dutch customer address).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR004 } from './nl-r-004';

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

describe('NL-R-004 (Dutch customer address)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateNlR004(document).passed).toEqual(true);
  });

  it('fails when Dutch parties and the customer has no street', async () => {
    const document = await withCountry(await decodeBaseExample(), 'NL', 'NL');
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        postalAddress: { ...document.accountingCustomerParty.postalAddress, streetName: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateNlR004(altered).passed).toEqual(false);
  });
});
