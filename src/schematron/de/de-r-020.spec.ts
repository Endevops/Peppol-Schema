/**
 * @description Unit tests for DE-R-020 (IBAN for code 59).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR020 } from './de-r-020';

async function asGerman(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DE' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DE' } },
    },
  } as unknown as PeppolDocument;
}

describe('DE-R-020 (IBAN for code 59)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR020(document).passed).toEqual(true);
  });

  it('fails when a German document uses code 59 with an invalid debited account IBAN', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '59' }, paymentMandate: { payerFinancialAccountId: { id: 'NOT-AN-IBAN' } } }],
    } as unknown as PeppolDocument;
    expect(validateDeR020(altered).passed).toEqual(false);
  });
});
