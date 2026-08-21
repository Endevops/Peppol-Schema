/**
 * @description Unit tests for DK-R-013 (schemeID for party identification).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR013 } from './dk-r-013';

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

describe('DK-R-013 (schemeID for party identification)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR013(document).passed).toEqual(true);
  });

  it('fails when a Danish document has a party identification without a scheme id', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, partyIdentification: { id: { id: '12345678', schemeId: undefined } } },
    } as unknown as PeppolDocument;
    expect(validateDkR013(altered).passed).toEqual(false);
  });

  it('passes when a Danish document has a party identification with a scheme id', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, partyIdentification: { id: { id: '12345678', schemeId: '0088' } } },
    } as unknown as PeppolDocument;
    expect(validateDkR013(altered).passed).toEqual(true);
  });
});
