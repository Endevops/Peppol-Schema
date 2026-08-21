/**
 * @description Unit tests for GR-R-003 (Greek VAT starts with EL).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR003 } from './gr-r-003';

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

describe('GR-R-003 (Greek VAT starts with EL)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR003(document).passed).toEqual(true);
  });

  it('fails when a Greek supplier VAT does not start with EL', async () => {
    const document = await withCountry(await decodeBaseExample(), 'GR', 'BE');
    expect(validateGrR003(document).passed).toEqual(false);
  });

  it('passes when a Greek supplier VAT is valid', async () => {
    const document = await withCountry(await decodeBaseExample(), 'GR', 'BE', 'EL094259216');
    expect(validateGrR003(document).passed).toEqual(true);
  });
});
