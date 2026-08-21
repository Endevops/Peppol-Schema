/**
 * @description Unit tests for DE-R-023-2 (credit transfer forbids card and mandate).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR023_2 } from './de-r-023-2';

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

describe('DE-R-023-2 (credit transfer forbids card and mandate)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR023_2(document).passed).toEqual(true);
  });

  it('fails when a German document uses code 58 with a card account', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '58' }, cardAccount: { networkId: 'VISA', primaryAccountNumberId: '1234' } }],
    } as unknown as PeppolDocument;
    expect(validateDeR023_2(altered).passed).toEqual(false);
  });
});
