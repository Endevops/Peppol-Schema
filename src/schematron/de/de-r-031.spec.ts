/**
 * @description Unit tests for DE-R-031 (direct debit requires debited account id).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR031 } from './de-r-031';

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

describe('DE-R-031 (direct debit requires debited account id)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR031(document).passed).toEqual(true);
  });

  it('fails when a German document has a payment mandate without a debited account id', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '59' }, paymentMandate: { id: 'MANDATE-1', payerFinancialAccountId: undefined } }],
    } as unknown as PeppolDocument;
    expect(validateDeR031(altered).passed).toEqual(false);
  });
});
