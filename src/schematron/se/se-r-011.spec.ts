/**
 * @description Unit tests for SE-R-011 (no 50/56 payment means codes).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR011 } from './se-r-011';

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

describe('SE-R-011 (no 50/56 payment means codes)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR011(document).passed).toEqual(true);
  });

  it('fails when a Swedish document uses payment means code 50', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '50' } }] } as unknown as PeppolDocument;
    expect(validateSeR011(altered).passed).toEqual(false);
  });
});
