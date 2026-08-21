/**
 * @description Unit tests for DK-R-011 (FIK 15-16 digit instruction id).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR011 } from './dk-r-011';

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

describe('DK-R-011 (FIK 15-16 digit instruction id)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR011(document).passed).toEqual(true);
  });

  it('fails when a Danish document uses code 93 with a 71# prefix but wrong length', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '93' }, paymentId: '71#123', payeeFinancialAccount: { id: '12345678' } }],
    } as unknown as PeppolDocument;
    expect(validateDkR011(altered).passed).toEqual(false);
  });

  it('passes when a Danish document uses code 93 with a valid 18-char payment id', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '93' }, paymentId: '71#123456789012345', payeeFinancialAccount: { id: '12345678' } }],
    } as unknown as PeppolDocument;
    expect(validateDkR011(altered).passed).toEqual(true);
  });
});
