/**
 * @description Unit tests for SE-R-004 (Swedish organisation numbers 10 characters).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR004 } from './se-r-004';

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

async function asSwedish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'SE' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'SE' } },
    },
  } as unknown as PeppolDocument;
}

describe('SE-R-004 (Swedish organisation numbers 10 characters)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR004(document).passed).toEqual(true);
  });

  it('fails when a Swedish supplier has a non-numeric organisation number', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'SE');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: 'ABC', schemeId: '0007' } },
      },
    } as unknown as PeppolDocument;
    expect(validateSeR004(altered).passed).toEqual(false);
  });

  it('fails when a Swedish supplier has a non-numeric organisation number', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'SE');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: 'ABC', schemeId: '0007' } },
      },
    } as unknown as PeppolDocument;
    expect(validateSeR004(altered).passed).toEqual(false);
  });

  it('passes when the supplier is not Swedish', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR004(document).passed).toEqual(true);
  });

  it('fails when a Swedish organisation number is not 10 characters', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '123', schemeId: '0007' } },
      },
    } as unknown as PeppolDocument;
    expect(validateSeR004(altered).passed).toEqual(false);
  });

  it('passes when a Swedish organisation number is 10 characters', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '5561234567', schemeId: '0007' } },
      },
    } as unknown as PeppolDocument;
    expect(validateSeR004(altered).passed).toEqual(true);
  });
});
