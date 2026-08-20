import { describe, it, expect } from 'vitest';
import * as z from 'zod/mini';

import { invoiceSchema } from '#/schemas/invoice';

const validInvoice = {
  customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
  profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
  id: 'INV-001',
  issueDate: '2024-01-15',
  documentCurrencyCode: 'EUR',
  accountingSupplierParty: {
    endpointId: { id: '1234567890', schemeId: '01' },
    postalAddress: { streetName: 'Main Street 1', cityName: 'London', postalZone: 'W1G 8LZ', countryCode: { identificationCode: 'GB' } },
    partyLegalEntity: { registrationName: 'Seller Company Ltd' },
  },
  accountingCustomerParty: {
    endpointId: { id: '9876543210', schemeId: '01' },
    postalAddress: { cityName: 'Paris', countryCode: { identificationCode: 'FR' } },
    partyLegalEntity: { registrationName: 'Buyer Company SA' },
  },
  taxTotals: [
    {
      taxAmount: { currencyId: 'EUR', value: 200 },
      taxSubtotals: [
        {
          taxAmount: { currencyId: 'EUR', value: 200 },
          taxableAmount: { currencyId: 'EUR', value: 1000 },
          taxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
        },
      ],
    },
  ],
  legalMonetaryTotal: {
    lineExtensionAmount: { currencyId: 'EUR', value: 1000 },
    taxExclusiveAmount: { currencyId: 'EUR', value: 1000 },
    taxInclusiveAmount: { currencyId: 'EUR', value: 1200 },
    payableAmount: { currencyId: 'EUR', value: 1200 },
  },
  invoiceLines: [
    {
      id: '1',
      invoicedQuantity: { value: 10, unitCode: 'C62' },
      lineExtensionAmount: { currencyId: 'EUR', value: 1000 },
      item: { name: 'Widget', classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } } },
      price: { priceAmount: { currencyId: 'EUR', value: 100 } },
    },
  ],
  invoiceTypeCode: '380',
};

describe('invoiceSchema', () => {
  it('should parse valid invoice', () => {
    const result = z.safeParse(invoiceSchema, validInvoice);
    expect(result.success).toBe(true);
  });

  it('should reject invoice without required id', () => {
    const { id: _id, ...noId } = validInvoice;
    const result = z.safeParse(invoiceSchema, noId);
    expect(result.success).toBe(false);
  });

  it('should reject invoice without invoice lines', () => {
    const { invoiceLines: _lines, ...noLines } = validInvoice;
    const result = z.safeParse(invoiceSchema, { ...noLines, invoiceLines: [] });
    expect(result.success).toBe(false);
  });

  it('should reject invoice with invalid invoice type code', () => {
    const result = z.safeParse(invoiceSchema, { ...validInvoice, invoiceTypeCode: '999' });
    expect(result.success).toBe(false);
  });

  it('should reject invoice with invalid issue date format', () => {
    const result = z.safeParse(invoiceSchema, { ...validInvoice, issueDate: '15-01-2024' });
    expect(result.success).toBe(false);
  });

  it('should parse invoice with optional fields', () => {
    const result = z.safeParse(invoiceSchema, {
      ...validInvoice,
      dueDate: '2024-02-15',
      note: 'Test invoice note',
      buyerReference: 'ref-001',
      projectReference: { id: 'PROJ-001' },
    });
    expect(result.success).toBe(true);
  });

  it('should apply default customizationId when omitted', () => {
    const { customizationId: _cid, ...noCustomization } = validInvoice;
    const result = z.safeParse(invoiceSchema, noCustomization);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.customizationId).toBe('urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0');
    }
  });

  it('should apply default profileId when omitted', () => {
    const { profileId: _pid, ...noProfile } = validInvoice;
    const result = z.safeParse(invoiceSchema, noProfile);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.profileId).toBe('urn:fdc:peppol.eu:2017:poacc:billing:01:1.0');
    }
  });

  it('should reject invoice with invalid customizationId prefix', () => {
    const result = z.safeParse(invoiceSchema, { ...validInvoice, customizationId: 'invalid-prefix' });
    expect(result.success).toBe(false);
  });

  it('should reject invoice with invalid profileId format', () => {
    const result = z.safeParse(invoiceSchema, { ...validInvoice, profileId: 'invalid-profile' });
    expect(result.success).toBe(false);
  });
});
