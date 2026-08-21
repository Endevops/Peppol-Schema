/**
 * @description Unit tests for DE-R-006 (seller contact telephone).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR006 } from './de-r-006';

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

describe('DE-R-006 (seller contact telephone)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR006(document).passed).toEqual(true);
  });

  it('fails when a German document has no seller contact telephone', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        contact: { ...document.accountingSupplierParty.contact, telephone: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateDeR006(altered).passed).toEqual(false);
  });
});
