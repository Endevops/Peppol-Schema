/**
 * @description Unit tests for SE-R-012 (no code 31 for domestic transactions).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR012 } from './se-r-012';

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

describe('SE-R-012 (no code 31 for domestic transactions)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR012(document).passed).toEqual(true);
  });

  it('fails when a Swedish document uses payment means code 31 domestically', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '31' } }] } as unknown as PeppolDocument;
    expect(validateSeR012(altered).passed).toEqual(false);
  });

  it('passes when a Swedish document uses code 30 domestically', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '30' } }] } as unknown as PeppolDocument;
    expect(validateSeR012(altered).passed).toEqual(true);
  });
});
