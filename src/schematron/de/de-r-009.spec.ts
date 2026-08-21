/**
 * @description Unit tests for DE-R-009 (buyer post code).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR009 } from './de-r-009';

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

describe('DE-R-009 (buyer post code)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR009(document).passed).toEqual(true);
  });

  it('fails when a German document has no buyer post code', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        postalAddress: { ...document.accountingCustomerParty.postalAddress, postalZone: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateDeR009(altered).passed).toEqual(false);
  });
});
