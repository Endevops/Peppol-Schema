/**
 * @description Unit tests for DK-R-014 (schemeID 0184 for Danish suppliers).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR014 } from './dk-r-014';

async function withSupplierCountry(document: PeppolDocument, country: string, vatPrefix?: string): Promise<PeppolDocument> {
  const vat = vatPrefix ?? `${country}VAT123456789`;
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: country } },
      partyTaxSchemes: [{ companyId: vat, taxSchemeId: { id: 'VAT' } }],
    },
  } as unknown as PeppolDocument;
}

describe('DK-R-014 (schemeID 0184 for Danish suppliers)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR014(document).passed).toEqual(true);
  });

  it('fails when a Danish supplier uses a wrong schemeID', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'DK');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '12345678', schemeId: '0190' } },
      },
    } as unknown as PeppolDocument;
    expect(validateDkR014(altered).passed).toEqual(false);
  });
});
