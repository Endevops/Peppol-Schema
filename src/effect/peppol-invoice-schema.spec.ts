// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolInvoiceSchema } from './peppol-invoice-schema';

const invoiceLine = {
  id: '1',
  invoicedQuantity: { value: 2, unitCode: 'C62' },
  lineExtensionAmount: { currencyId: 'EUR', value: 100 },
  item: { name: 'Widget', classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } } },
  price: { priceAmount: { currencyId: 'EUR', value: 50 } },
};

const validInvoice = {
  customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
  profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
  id: 'INV-001',
  issueDate: '2024-01-15',
  documentCurrencyCode: 'EUR',
  accountingSupplierParty: {
    endpointId: { id: '1234567890', schemeId: '0088' },
    postalAddress: { streetName: 'Main Street 1', cityName: 'London', postalZone: 'W1G 8LZ', countryCode: { identificationCode: 'GB' } },
    partyLegalEntity: { registrationName: 'Seller Company Ltd' },
  },
  accountingCustomerParty: {
    endpointId: { id: '9876543210', schemeId: '0088' },
    postalAddress: { cityName: 'Paris', countryCode: { identificationCode: 'FR' } },
    partyLegalEntity: { registrationName: 'Buyer Company SA' },
  },
  taxTotals: [
    {
      taxAmount: { currencyId: 'EUR', value: 20 },
      taxSubtotals: [
        {
          taxAmount: { currencyId: 'EUR', value: 20 },
          taxableAmount: { currencyId: 'EUR', value: 100 },
          taxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
        },
      ],
    },
  ],
  legalMonetaryTotal: {
    lineExtensionAmount: { currencyId: 'EUR', value: 100 },
    taxExclusiveAmount: { currencyId: 'EUR', value: 100 },
    taxInclusiveAmount: { currencyId: 'EUR', value: 120 },
    payableAmount: { currencyId: 'EUR', value: 120 },
  },
  invoiceLines: [invoiceLine],
  invoiceTypeCode: '380',
};

describe('peppolInvoiceSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolInvoiceSchema);
  const decode = testSchema.decoding();

  it('should decode a valid invoice', async () => {
    await decode.succeed(validInvoice);
  });

  it('should apply default customizationId and profileId when omitted', async () => {
    const { customizationId: _cid, profileId: _pid, ...withoutDefaults } = validInvoice;
    await decode.succeed(withoutDefaults, validInvoice);
  });

  it('should reject an invoice without required id', async () => {
    const { id: _id, ...noId } = validInvoice;
    await decode.fail(noId, 'Missing key\n  at ["id"]');
  });

  it('should reject an invoice without invoice type code', async () => {
    const { invoiceTypeCode: _type, ...noType } = validInvoice;
    await decode.fail(noType, 'Missing key\n  at ["invoiceTypeCode"]');
  });

  it('should reject an invoice without invoice lines', async () => {
    await decode.fail({ ...validInvoice, invoiceLines: [] }, 'Expected a value with a length of at least 1\n  at ["invoiceLines"]');
  });

  it('should reject an invoice with an invalid invoice type code', async () => {
    await decode.fail(
      { ...validInvoice, invoiceTypeCode: '999' },
      'Expected "71" | "80" | "82" | "84" | "102" | "218" | "219" | "326" | "331" | "380" | "382" | "383" | "384" | "386" | "388" | "389" | "393" | "395" | "553" | "575" | "623" | "780" | "817" | "870" | "875" | "876" | "877"\n  at ["invoiceTypeCode"]'
    );
  });

  it('should reject an invoice with an invalid due date', async () => {
    await decode.fail({ ...validInvoice, dueDate: 'not-a-date' }, 'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}$\n  at ["dueDate"]');
  });

  it('should decode an invoice with optional due date and project reference', async () => {
    await decode.succeed({ ...validInvoice, dueDate: '2024-02-15', projectReference: { id: 'PRJ-1' } });
  });
});
