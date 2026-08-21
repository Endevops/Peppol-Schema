/**
 * @description Unit tests for DE-R-025-2 (direct debit forbids payee account and card).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR025_2 } from './de-r-025-2';

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

describe('DE-R-025-2 (direct debit forbids payee account and card)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR025_2(document).passed).toEqual(true);
  });

  it('fails when a German document uses code 59 with a payee account', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '59' }, payeeFinancialAccount: { id: 'DE1234567890' } }],
    } as unknown as PeppolDocument;
    expect(validateDeR025_2(altered).passed).toEqual(false);
  });
});
