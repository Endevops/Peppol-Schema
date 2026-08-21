/**
 * @description Unit tests for SE-R-009 (Bankgiro account length).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR009 } from './se-r-009';

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

describe('SE-R-009 (Bankgiro account length)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR009(document).passed).toEqual(true);
  });

  it('fails when a Swedish Bankgiro account has an invalid length', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: '123', financialInstitutionBranch: { id: 'SE:BANKGIRO' } } }],
    } as unknown as PeppolDocument;
    expect(validateSeR009(altered).passed).toEqual(false);
  });

  it('passes when a Swedish Bankgiro account has a valid length', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [
        { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: '1234567', financialInstitutionBranch: { id: 'SE:BANKGIRO' } } },
      ],
    } as unknown as PeppolDocument;
    expect(validateSeR009(altered).passed).toEqual(true);
  });
});
