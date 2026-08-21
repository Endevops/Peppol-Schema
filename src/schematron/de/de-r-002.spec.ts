/**
 * @description Unit tests for DE-R-002 (seller contact).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR002 } from './de-r-002';

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

describe('DE-R-002 (seller contact)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR002(document).passed).toEqual(true);
  });

  it('fails when a German document has no seller contact', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, contact: undefined },
    } as unknown as PeppolDocument;
    expect(validateDeR002(altered).passed).toEqual(false);
  });
});
