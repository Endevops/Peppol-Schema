/**
 * @description Unit tests for IT-R-003 (Italian seller city).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateItR003 } from './it-r-003';

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

async function asItalian(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'IT123456789', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'IT' } },
    },
  } as unknown as PeppolDocument;
}

describe('IT-R-003 (Italian seller city)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateItR003(document).passed).toEqual(true);
  });

  it('fails when an Italian supplier has no city', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'IT');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        postalAddress: { ...document.accountingSupplierParty.postalAddress, cityName: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateItR003(altered).passed).toEqual(false);
  });

  it('passes when the supplier is not Italian', async () => {
    const document = await decodeBaseExample();
    expect(validateItR003(document).passed).toEqual(true);
  });

  it('fails when an Italian supplier has no city', async () => {
    const document = await asItalian(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        postalAddress: { ...document.accountingSupplierParty.postalAddress, cityName: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateItR003(altered).passed).toEqual(false);
  });

  it('passes when an Italian supplier has a city', async () => {
    const document = await asItalian(await decodeBaseExample());
    expect(validateItR003(document).passed).toEqual(true);
  });
});
