/**
 * @description Unit tests for DE-R-028 (seller email format).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR028 } from './de-r-028';

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

describe('DE-R-028 (seller email format)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR028(document).passed).toEqual(true);
  });

  it('fails when a German document has an invalid seller email', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        contact: { ...document.accountingSupplierParty.contact, electronicMail: 'not-an-email' },
      },
    } as unknown as PeppolDocument;
    expect(validateDeR028(altered).passed).toEqual(false);
  });
});
