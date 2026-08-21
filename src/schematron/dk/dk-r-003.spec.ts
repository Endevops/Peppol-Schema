/**
 * @description Unit tests for DK-R-003 (UNSPSC version).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR003 } from './dk-r-003';

async function asDanish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'DK12345678', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'DK87654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
  } as unknown as PeppolDocument;
}

describe('DK-R-003 (UNSPSC version)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR003(document).passed).toEqual(true);
  });

  it('fails when a Danish line uses listID TST with an unsupported version', async () => {
    const document = await asDanish(await decodeBaseExample());
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ item: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [
        { ...line, item: { ...line.item, commodityClassifications: [{ itemClassification: { id: '123', listId: 'TST', listVersionId: '1.0' } }] } },
        ...lines.slice(1),
      ],
    } as unknown as PeppolDocument;
    expect(validateDkR003(altered).passed).toEqual(false);
  });

  it('passes when a Danish line uses listID TST with a supported version', async () => {
    const document = await asDanish(await decodeBaseExample());
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ item: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [
        {
          ...line,
          item: { ...line.item, commodityClassifications: [{ itemClassification: { id: '123', listId: 'TST', listVersionId: '26.0801' } }] },
        },
        ...lines.slice(1),
      ],
    } as unknown as PeppolDocument;
    expect(validateDkR003(altered).passed).toEqual(true);
  });
});
