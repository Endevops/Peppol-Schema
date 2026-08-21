/**
 * @description Unit tests for DE-R-027 (seller telephone format).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR027 } from './de-r-027';

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

describe('DE-R-027 (seller telephone format)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR027(document).passed).toEqual(true);
  });

  it('fails when a German document has a seller telephone without 3 digits', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, contact: { ...document.accountingSupplierParty.contact, telephone: '12' } },
    } as unknown as PeppolDocument;
    expect(validateDeR027(altered).passed).toEqual(false);
  });
});
