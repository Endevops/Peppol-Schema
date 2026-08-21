/**
 * @description Unit tests for DE-R-011 (deliver to post code).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR011 } from './de-r-011';

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

describe('DE-R-011 (deliver to post code)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR011(document).passed).toEqual(true);
  });

  it('fails when a German document has a delivery address without a post code', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      delivery: { deliveryLocation: { address: { ...document.accountingSupplierParty.postalAddress, postalZone: undefined } } },
    } as unknown as PeppolDocument;
    expect(validateDeR011(altered).passed).toEqual(false);
  });
});
