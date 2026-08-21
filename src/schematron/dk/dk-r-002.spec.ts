/**
 * @description Unit tests for DK-R-002 (Danish suppliers MUST provide legal entity).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR002 } from './dk-r-002';

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

describe('DK-R-002 (Danish suppliers MUST provide legal entity)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR002(document).passed).toEqual(true);
  });

  it('fails when a Danish supplier has no legal entity company id', async () => {
    const document = await withSupplierCountry(await decodeBaseExample(), 'DK');
    const altered = {
      ...document,
      accountingSupplierParty: {
        ...document.accountingSupplierParty,
        partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateDkR002(altered).passed).toEqual(false);
  });
});
