/**
 * @description Unit tests for DK-R-005 (allowed payment means codes).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR005 } from './dk-r-005';

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

describe('DK-R-005 (allowed payment means codes)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR005(document).passed).toEqual(true);
  });

  it('fails when a Danish document uses a disallowed payment means code', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '99' } }] } as unknown as PeppolDocument;
    expect(validateDkR005(altered).passed).toEqual(false);
  });
});
