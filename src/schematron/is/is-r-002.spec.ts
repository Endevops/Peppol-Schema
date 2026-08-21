/**
 * @description Unit tests for IS-R-002 (Icelandic seller legal id).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR002 } from './is-r-002';

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

describe('IS-R-002 (Icelandic seller legal id)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateIsR002(document).passed).toEqual(true);
  });

  it('fails when an Icelandic supplier has no legal id', async () => {
    const document = await withCountry(await decodeBaseExample(), 'IS', 'BE');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateIsR002(altered).passed).toEqual(false);
  });

  it('passes when an Icelandic supplier has a legal id with scheme 0196', async () => {
    const document = await withCountry(await decodeBaseExample(), 'IS', 'BE');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '1234567890', schemeId: '0196' } },
      },
    } as unknown as PeppolDocument;
    expect(validateIsR002(altered).passed).toEqual(true);
  });
});
