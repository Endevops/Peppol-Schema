/**
 * @description Unit tests for DE-R-022 (unique attachment filenames).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR022 } from './de-r-022';

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

describe('DE-R-022 (unique attachment filenames)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR022(document).passed).toEqual(true);
  });

  it('fails when both parties are German and two attachments share a filename', async () => {
    const document = await withCountry(await decodeBaseExample(), 'DE', 'DE');
    const altered = {
      ...document,
      additionalDocumentReferences: [
        { id: { id: 'a' }, attachment: { embeddedDocumentBinaryObject: { content: 'aGVsbG8=', mimeCode: 'application/pdf', filename: 'same.pdf' } } },
        { id: { id: 'b' }, attachment: { embeddedDocumentBinaryObject: { content: 'aGVsbG8=', mimeCode: 'application/pdf', filename: 'SAME.PDF' } } },
      ],
    } as unknown as PeppolDocument;
    expect(validateDeR022(altered).passed).toEqual(false);
  });
});
