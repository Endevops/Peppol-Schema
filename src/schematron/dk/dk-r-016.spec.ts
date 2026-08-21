/**
 * @description Unit tests for DK-R-016 (Danish credit note cannot be negative).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validateDkR016 } from './dk-r-016';

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

describe('DK-R-016 (Danish credit note cannot be negative)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR016(document).passed).toEqual(true);
  });

  it('fails when a Danish credit note has a negative payable amount', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'DK');
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        partyTaxSchemes: [{ companyId: 'DK12345678', taxSchemeId: { id: 'VAT' } }],
        postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DK' } },
      },
      creditNoteLines: [{ id: '1' }],
      legalMonetaryTotal: { ...document.legalMonetaryTotal, payableAmount: { currencyId: 'EUR', value: -100 } },
    } as unknown as PeppolDocument;
    expect(validateDkR016(altered).passed).toEqual(false);
  });

  it('DK-R-016 should pass on the credit note fixture (non-Danish)', async () => {
    const document = await decodeFixture(fixtures.creditNote);
    expect(validateDkR016(document).passed).toEqual(true);
  });
});
