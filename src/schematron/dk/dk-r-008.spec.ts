/**
 * @description Unit tests for DK-R-008 (giro payment id and account).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR008 } from './dk-r-008';

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

describe('DK-R-008 (giro payment id and account)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR008(document).passed).toEqual(true);
  });

  it('fails when a Danish document uses code 50 with a wrong payment id prefix', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '50' }, paymentId: '99#123', payeeFinancialAccount: { id: '1234567' } }],
    } as unknown as PeppolDocument;
    expect(validateDkR008(altered).passed).toEqual(false);
  });

  it('passes when a Danish document uses code 50 with a valid payment id', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '50' }, paymentId: '01#123', payeeFinancialAccount: { id: '1234567' } }],
    } as unknown as PeppolDocument;
    expect(validateDkR008(altered).passed).toEqual(true);
  });
});
