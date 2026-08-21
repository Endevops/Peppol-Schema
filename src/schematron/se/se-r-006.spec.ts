/**
 * @description Unit tests for SE-R-006 (standard VAT rate).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR006 } from './se-r-006';

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

describe('SE-R-006 (standard VAT rate)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateSeR006(document).passed).toEqual(true);
  });

  it('fails when a Swedish supplier uses an unsupported VAT rate', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ item: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [
        { ...line, item: { ...line.item, classifiedTaxCategory: { ...line.item.classifiedTaxCategory, percent: 17 } } },
        ...lines.slice(1),
      ],
    } as unknown as PeppolDocument;
    expect(validateSeR006(altered).passed).toEqual(false);
  });

  it('passes when a Swedish supplier uses a standard VAT rate', async () => {
    const document = await asSwedish(await decodeBaseExample());
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ item: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [
        { ...line, item: { ...line.item, classifiedTaxCategory: { ...line.item.classifiedTaxCategory, percent: 25 } } },
        ...lines.slice(1),
      ],
    } as unknown as PeppolDocument;
    expect(validateSeR006(altered).passed).toEqual(true);
  });
});
