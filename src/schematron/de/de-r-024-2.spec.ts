/**
 * @description Unit tests for DE-R-024-2 (card code forbids payee account and mandate).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR024_2 } from './de-r-024-2';

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

describe('DE-R-024-2 (card code forbids payee account and mandate)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR024_2(document).passed).toEqual(true);
  });

  it('fails when a German document uses code 54 with a payee account', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '54' }, payeeFinancialAccount: { id: 'DE1234567890' } }],
    } as unknown as PeppolDocument;
    expect(validateDeR024_2(altered).passed).toEqual(false);
  });
});
