/**
 * @description Unit tests for DE-R-017 (invoice type code).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR017 } from './de-r-017';

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

describe('DE-R-017 (invoice type code)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR017(document).passed).toEqual(true);
  });

  it('fails when a German document uses an unsupported invoice type code', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = { ...document, invoiceTypeCode: '999' } as unknown as PeppolDocument;
    expect(validateDeR017(altered).passed).toEqual(false);
  });

  it('passes when a German document uses a supported invoice type code', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = { ...document, invoiceTypeCode: '380' } as unknown as PeppolDocument;
    expect(validateDeR017(altered).passed).toEqual(true);
  });
});
