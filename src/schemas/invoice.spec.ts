import { describe, it, expect } from 'vitest';
import * as z from 'zod/mini';

import { invoiceSchema } from './invoice';

const validInvoice = {
  accountingCustomerParty: {
    endpointId: { id: '9876543210', schemeId: '0088' },
    partyLegalEntity: { registrationName: 'Buyer Company SA' },
    postalAddress: { cityName: 'Paris', countryCode: { identificationCode: 'FR' } },
  },
  accountingSupplierParty: {
    endpointId: { id: '1234567890', schemeId: '0088' },
    partyLegalEntity: { registrationName: 'Seller Company Ltd' },
    postalAddress: { cityName: 'London', countryCode: { identificationCode: 'GB' }, postalZone: 'W1G 8LZ', streetName: 'Main Street 1' },
  },
  customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
  documentCurrencyCode: 'EUR',
  id: 'INV-001',
  invoiceLines: [
    {
      id: '1',
      invoicedQuantity: { unitCode: 'C62', value: 10 },
      item: { classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } }, name: 'Widget' },
      lineExtensionAmount: { currencyId: 'EUR', value: 1000 },
      price: { priceAmount: { currencyId: 'EUR', value: 100 } },
    },
  ],
  invoiceTypeCode: '380',
  issueDate: '2024-01-15',
  legalMonetaryTotal: {
    lineExtensionAmount: { currencyId: 'EUR', value: 1000 },
    payableAmount: { currencyId: 'EUR', value: 1200 },
    taxExclusiveAmount: { currencyId: 'EUR', value: 1000 },
    taxInclusiveAmount: { currencyId: 'EUR', value: 1200 },
  },
  profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
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
      buyerReference: 'ref-001',
      dueDate: '2024-02-15',
      note: 'Test invoice note',
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
