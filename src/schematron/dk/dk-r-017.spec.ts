/**
 * @description Unit tests for DK-R-017 (customer legal entity scheme 0184).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR017 } from './dk-r-017';

async function asDanish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'DK12345678', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'DK87654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
  } as unknown as PeppolDocument;
}

describe('DK-R-017 (customer legal entity scheme 0184)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR017(document).passed).toEqual(true);
  });

  it('fails when a Danish customer has a legal entity with a wrong scheme', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: { id: '12345678', schemeId: '0190' } },
      },
    } as unknown as PeppolDocument;
    expect(validateDkR017(altered).passed).toEqual(false);
  });

  it('passes when a Danish customer has a legal entity with scheme 0184', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: { id: '12345678', schemeId: '0184' } },
      },
    } as unknown as PeppolDocument;
    expect(validateDkR017(altered).passed).toEqual(true);
  });
});
