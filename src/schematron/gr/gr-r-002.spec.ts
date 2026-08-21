/**
 * @description Unit tests for GR-R-002 (Greek supplier full name).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR002 } from './gr-r-002';

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

describe('GR-R-002 (Greek supplier full name)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR002(document).passed).toEqual(true);
  });

  it('fails when a Greek supplier has no party name', async () => {
    const document = await withCountry(await decodeBaseExample(), 'GR', 'BE');
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, partyName: undefined },
    } as unknown as PeppolDocument;
    expect(validateGrR002(altered).passed).toEqual(false);
  });
});
