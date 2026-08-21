/**
 * @description Unit tests for DE-R-014 (VAT category rate).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR014 } from './de-r-014';

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

describe('DE-R-014 (VAT category rate)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR014(document).passed).toEqual(true);
  });

  it('fails when a German document has a tax subtotal without a VAT rate', async () => {
    const document = await asGerman(await decodeBaseExample());
    const subtotal = document.taxTotals[0]?.taxSubtotals?.[0];
    if (!subtotal) {
      throw new Error('base example has no tax subtotal');
    }
    const altered = {
      ...document,
      taxTotals: [
        {
          taxAmount: document.taxTotals[0]?.taxAmount,
          taxSubtotals: [{ ...subtotal, taxCategory: { ...subtotal.taxCategory, percent: undefined } }],
        },
      ],
    } as unknown as PeppolDocument;
    expect(validateDeR014(altered).passed).toEqual(false);
  });
});
