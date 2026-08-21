/**
 * @description Unit tests for DE-R-008 (buyer city).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR008 } from './de-r-008';

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

describe('DE-R-008 (buyer city)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR008(document).passed).toEqual(true);
  });

  it('fails when a German document has no buyer city', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        postalAddress: { ...document.accountingCustomerParty.postalAddress, cityName: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateDeR008(altered).passed).toEqual(false);
  });
});
