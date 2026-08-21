/**
 * @description Unit tests for DK-R-006 (bank account for codes 31/42).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR006 } from './dk-r-006';

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

describe('DK-R-006 (bank account for codes 31/42)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR006(document).passed).toEqual(true);
  });

  it('fails when a Danish document uses code 42 without a bank account', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '42' }, payeeFinancialAccount: { id: '123' } }],
    } as unknown as PeppolDocument;
    expect(validateDkR006(altered).passed).toEqual(false);
  });

  it('passes when a Danish document uses code 42 with account and branch', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '42' }, payeeFinancialAccount: { id: '123', financialInstitutionBranch: { id: 'BIC' } } }],
    } as unknown as PeppolDocument;
    expect(validateDkR006(altered).passed).toEqual(true);
  });
});
