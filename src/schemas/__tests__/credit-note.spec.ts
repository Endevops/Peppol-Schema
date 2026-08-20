import { describe, it, expect } from 'vitest';
import * as z from 'zod/mini';

import { creditNoteSchema } from '#/schemas/credit-note';

const validCreditNote = {
  customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
  profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
  id: 'CN-001',
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
  creditNoteLines: [
    {
      id: '1',
      creditedQuantity: { value: 2, unitCode: 'C62' },
      lineExtensionAmount: { currencyId: 'EUR', value: 100 },
      item: { name: 'Widget', classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } } },
      price: { priceAmount: { currencyId: 'EUR', value: 50 } },
    },
  ],
  creditNoteTypeCode: '381',
};

describe('creditNoteSchema', () => {
  it('should parse valid credit note', () => {
    const result = z.safeParse(creditNoteSchema, validCreditNote);
    expect(result.success).toBe(true);
  });

  it('should reject credit note without required id', () => {
    const { id: _id, ...noId } = validCreditNote;
    const result = z.safeParse(creditNoteSchema, noId);
    expect(result.success).toBe(false);
  });

  it('should reject credit note without credit note lines', () => {
    const result = z.safeParse(creditNoteSchema, { ...validCreditNote, creditNoteLines: [] });
    expect(result.success).toBe(false);
  });

  it('should reject credit note with invalid credit note type code', () => {
    const result = z.safeParse(creditNoteSchema, { ...validCreditNote, creditNoteTypeCode: '999' });
    expect(result.success).toBe(false);
  });

  it('should reject credit note with invalid issue date', () => {
    const result = z.safeParse(creditNoteSchema, { ...validCreditNote, issueDate: 'not-a-date' });
    expect(result.success).toBe(false);
  });

  it('should parse credit note with optional fields', () => {
    const result = z.safeParse(creditNoteSchema, {
      ...validCreditNote,
      note: 'Credit note for returned goods',
      buyerReference: 'ref-001',
      orderReference: { id: 'PO-001' },
    });
    expect(result.success).toBe(true);
  });

  it('should apply default customizationId when omitted', () => {
    const { customizationId: _cid, ...noCustomization } = validCreditNote;
    const result = z.safeParse(creditNoteSchema, noCustomization);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.customizationId).toBe('urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0');
    }
  });
});
