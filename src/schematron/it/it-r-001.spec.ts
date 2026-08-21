/**
 * @description Unit tests for IT-R-001 (Italian seller tax registration identifier length).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateItR001 } from './it-r-001';

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

describe('IT-R-001 (Italian seller tax registration identifier length)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateItR001(document).passed).toEqual(true);
  });

  it('fails when an Italian supplier has a too-short tax registration identifier', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'IT');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyTaxSchemes: [
          { companyId: '1234567890', taxSchemeId: { id: 'TAX' } },
          { companyId: 'IT123456789', taxSchemeId: { id: 'VAT' } },
        ],
      },
    } as unknown as PeppolDocument;
    expect(validateItR001(altered).passed).toEqual(false);
  });
});
