/**
 * @description Unit tests for SE-R-010 (Plusgiro account length).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR010 } from './se-r-010';

async function asSwedish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'SE' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'SE' } },
    },
  } as unknown as PeppolDocument;
}

describe('SE-R-010 (Plusgiro account length)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR010(document).passed).toEqual(true);
  });

  it('fails when a Swedish Plusgiro account is too long', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [
        { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: '123456789', financialInstitutionBranch: { id: 'SE:PLUSGIRO' } } },
      ],
    } as unknown as PeppolDocument;
    expect(validateSeR010(altered).passed).toEqual(false);
  });

  it('passes when a Swedish Plusgiro account has a valid length', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [
        { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: '12345678', financialInstitutionBranch: { id: 'SE:PLUSGIRO' } } },
      ],
    } as unknown as PeppolDocument;
    expect(validateSeR010(altered).passed).toEqual(true);
  });
});
