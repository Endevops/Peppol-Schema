/**
 * @description Unit tests for DE-R-007 (seller contact email).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR007 } from './de-r-007';

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

describe('DE-R-007 (seller contact email)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR007(document).passed).toEqual(true);
  });

  it('fails when a German document has no seller contact email', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        contact: { ...document.accountingSupplierParty.contact, electronicMail: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateDeR007(altered).passed).toEqual(false);
  });
});
