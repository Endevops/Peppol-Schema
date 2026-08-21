/**
 * @description Unit tests for SE-R-008 (Bankgiro account numeric).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR008 } from './se-r-008';

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

describe('SE-R-008 (Bankgiro account numeric)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR008(document).passed).toEqual(true);
  });

  it('fails when a Swedish Bankgiro account is not numeric', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [
        { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: 'ABC123', financialInstitutionBranch: { id: 'SE:BANKGIRO' } } },
      ],
    } as unknown as PeppolDocument;
    expect(validateSeR008(altered).passed).toEqual(false);
  });
});
