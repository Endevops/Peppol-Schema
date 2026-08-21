/**
 * @description Unit tests for GR-R-005 (Greek supplier buyer name).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR005 } from './gr-r-005';

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

describe('GR-R-005 (Greek supplier buyer name)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR005(document).passed).toEqual(true);
  });

  it('fails when a Greek supplier has no buyer party name', async () => {
    const document = await withCountry(await decodeBaseExample(), 'GR', 'BE');
    const altered = {
      ...document,
      accountingCustomerParty: { ...document.accountingCustomerParty, partyName: undefined },
    } as unknown as PeppolDocument;
    expect(validateGrR005(altered).passed).toEqual(false);
  });
});
