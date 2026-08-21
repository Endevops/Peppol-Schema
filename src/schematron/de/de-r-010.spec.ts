/**
 * @description Unit tests for DE-R-010 (deliver to city).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR010 } from './de-r-010';

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

describe('DE-R-010 (deliver to city)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR010(document).passed).toEqual(true);
  });

  it('fails when a German document has a delivery address without a city', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      delivery: { deliveryLocation: { address: { ...document.accountingSupplierParty.postalAddress, cityName: undefined } } },
    } as unknown as PeppolDocument;
    expect(validateDeR010(altered).passed).toEqual(false);
  });
});
