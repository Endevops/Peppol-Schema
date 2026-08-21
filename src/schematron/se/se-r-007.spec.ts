/**
 * @description Unit tests for SE-R-007 (Plusgiro account numeric).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR007 } from './se-r-007';

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

describe('SE-R-007 (Plusgiro account numeric)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR007(document).passed).toEqual(true);
  });

  it('fails when a Swedish Plusgiro account is not numeric', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [
        { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: 'ABC123', financialInstitutionBranch: { id: 'SE:PLUSGIRO' } } },
      ],
    } as unknown as PeppolDocument;
    expect(validateSeR007(altered).passed).toEqual(false);
  });
});
