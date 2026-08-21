/**
 * @description Unit tests for DK-R-009 (giro 16 digit instruction id).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR009 } from './dk-r-009';

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

describe('DK-R-009 (giro 16 digit instruction id)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR009(document).passed).toEqual(true);
  });

  it('fails when a Danish document uses code 50 with a 04# prefix but wrong length', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '50' }, paymentId: '04#12345' }] } as unknown as PeppolDocument;
    expect(validateDkR009(altered).passed).toEqual(false);
  });
});
