/**
 * @description Unit tests for DE-R-026 (code 384 requires preceding invoice reference).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR026 } from './de-r-026';

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

describe('DE-R-026 (code 384 requires preceding invoice reference)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR026(document).passed).toEqual(true);
  });

  it('fails when a German document uses invoice type 384 without a billing reference', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = { ...document, invoiceTypeCode: '384', billingReferences: undefined } as unknown as PeppolDocument;
    expect(validateDeR026(altered).passed).toEqual(false);
  });
});
