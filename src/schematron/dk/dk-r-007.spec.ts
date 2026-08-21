/**
 * @description Unit tests for DK-R-007 (mandate for code 49).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR007 } from './dk-r-007';

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

describe('DK-R-007 (mandate for code 49)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR007(document).passed).toEqual(true);
  });

  it('fails when a Danish document uses code 49 without a mandate id', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '49' }, paymentMandate: { id: undefined, payerFinancialAccountId: { id: '123' } } }],
    } as unknown as PeppolDocument;
    expect(validateDkR007(altered).passed).toEqual(false);
  });
});
