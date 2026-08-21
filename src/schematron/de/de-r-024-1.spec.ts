/**
 * @description Unit tests for DE-R-024-1 (card code requires card account).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR024_1 } from './de-r-024-1';

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

describe('DE-R-024-1 (card code requires card account)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR024_1(document).passed).toEqual(true);
  });

  it('fails when a German document uses code 48 without a card account', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '48' }, cardAccount: undefined }] } as unknown as PeppolDocument;
    expect(validateDeR024_1(altered).passed).toEqual(false);
  });
});
