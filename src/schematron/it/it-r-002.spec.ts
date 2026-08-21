/**
 * @description Unit tests for IT-R-002 (Italian supplier address).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateItR002 } from './it-r-002';

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

describe('IT-R-002 (Italian supplier address)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateItR002(document).passed).toEqual(true);
  });

  it('fails when an Italian supplier has no address line', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'IT');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        postalAddress: { ...document.accountingSupplierParty.postalAddress, streetName: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateItR002(altered).passed).toEqual(false);
  });
});
