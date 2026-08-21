/**
 * @description Unit tests for NL-R-001 (Dutch credit note requires invoice reference).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR001 } from './nl-r-001';

async function withCountry(
  document: PeppolDocument,
  supplierCountry: string,
  customerCountry: string,
  supplierVatPrefix = `${supplierCountry}VAT123456789`,
  customerVatPrefix = `${customerCountry}VAT123456789`
): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: supplierVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: supplierCountry } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: customerVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: customerCountry } },
    },
  } as unknown as PeppolDocument;
}

describe('NL-R-001 (Dutch credit note requires invoice reference)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateNlR001(document).passed).toEqual(true);
  });

  it('fails when a Dutch credit note has no billing reference', async () => {
    const document = await withCountry(await decodeBaseExample(), 'NL', 'BE');
    const altered = { ...document, creditNoteTypeCode: '381', billingReferences: undefined } as unknown as PeppolDocument;
    expect(validateNlR001(altered).passed).toEqual(false);
  });

  it('passes when a Dutch credit note has a billing reference', async () => {
    const document = await withCountry(await decodeBaseExample(), 'NL', 'BE');
    const altered = {
      ...document,
      creditNoteTypeCode: '381',
      billingReferences: [{ invoiceDocumentReference: { id: 'inv-1' } }],
    } as unknown as PeppolDocument;
    expect(validateNlR001(altered).passed).toEqual(true);
  });
});
