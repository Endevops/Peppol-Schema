/**
 * @description Unit tests for SE-R-005 (seller tax registration identifier).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR005 } from './se-r-005';

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

describe('SE-R-005 (seller tax registration identifier)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR005(document).passed).toEqual(true);
  });

  it('fails when a Swedish supplier tax registration identifier is not F-skatt', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyTaxSchemes: [
          { companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } },
          { companyId: 'SomethingElse', taxSchemeId: { id: 'TAX' } },
        ],
      },
    } as unknown as PeppolDocument;
    expect(validateSeR005(altered).passed).toEqual(false);
  });

  it('passes when a Swedish supplier tax registration identifier is F-skatt', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyTaxSchemes: [
          { companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } },
          { companyId: 'GODKÄND FÖR F-SKATT', taxSchemeId: { id: 'TAX' } },
        ],
      },
    } as unknown as PeppolDocument;
    expect(validateSeR005(altered).passed).toEqual(true);
  });
});
