/**
 * @description Unit tests for SE-R-002 (Swedish VAT number trailing 12 numeric).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR002 } from './se-r-002';

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

describe('SE-R-002 (Swedish VAT number trailing 12 numeric)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR002(document).passed).toEqual(true);
  });

  it('fails when a Swedish supplier VAT number has non-numeric trailing characters', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'SE', 'SE1234567890ABC');
    expect(validateSeR002(document).passed).toEqual(false);
  });
});
