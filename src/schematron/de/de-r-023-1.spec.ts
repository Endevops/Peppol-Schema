/**
 * @description Unit tests for DE-R-023-1 (credit transfer requires payee account).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR023_1 } from './de-r-023-1';

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

describe('DE-R-023-1 (credit transfer requires payee account)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR023_1(document).passed).toEqual(true);
  });

  it('fails when a German document uses code 30 without a payee account', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '30' }, payeeFinancialAccount: undefined }],
    } as unknown as PeppolDocument;
    expect(validateDeR023_1(altered).passed).toEqual(false);
  });
});
