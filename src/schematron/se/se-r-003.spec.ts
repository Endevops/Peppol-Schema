/**
 * @description Unit tests for SE-R-003 (Swedish organisation numbers).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR003 } from './se-r-003';

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

describe('SE-R-003 (Swedish organisation numbers)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR003(document).passed).toEqual(true);
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
    expect(validateSeR003(altered).passed).toEqual(false);
  });
});
