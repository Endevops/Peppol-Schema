/**
 * @description Unit tests for NO-R-001 (Norwegian VAT number format).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNoR001 } from './no-r-001';

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

describe('NO-R-001 (Norwegian VAT number format)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateNoR001(document).passed).toEqual(true);
  });

  it('fails when a Norwegian supplier has an invalid VAT number', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'NO', 'NO123456789MVA');
    expect(validateNoR001(document).passed).toEqual(false);
  });
});
