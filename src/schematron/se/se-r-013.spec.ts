/**
 * @description Unit tests for SE-R-013 (Swedish org number Luhn).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR013 } from './se-r-013';

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

describe('SE-R-013 (Swedish org number Luhn)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR013(document).passed).toEqual(true);
  });

  it('passes for a valid Swedish org number', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'SE');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '5561234567', schemeId: '0007' } },
      },
    } as unknown as PeppolDocument;
    expect(validateSeR013(altered).passed).toEqual(true);
  });
});
