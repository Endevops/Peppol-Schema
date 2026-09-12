import { DateTime } from 'effect';
// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolCreditNoteSchema } from '#/effect/peppol-credit-note-schema';

const validCreditNote = {
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
  creditNoteLines: [
    {
      creditedQuantity: { unitCode: 'C62', value: 2 },
      id: '1',
      item: { classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } }, name: 'Widget' },
      lineExtensionAmount: { currencyId: 'EUR', value: 100 },
      price: { priceAmount: { currencyId: 'EUR', value: 50 } },
    },
  ],
  creditNoteTypeCode: '381',
  customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
  documentCurrencyCode: 'EUR',
  id: 'CN-001',
  issueDate: '2024-01-15',
  legalMonetaryTotal: {
    lineExtensionAmount: { currencyId: 'EUR', value: 100 },
    payableAmount: { currencyId: 'EUR', value: 120 },
    taxExclusiveAmount: { currencyId: 'EUR', value: 100 },
    taxInclusiveAmount: { currencyId: 'EUR', value: 120 },
  },
  profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
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
};

describe('peppolCreditNoteSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolCreditNoteSchema);
  const decode = testSchema.decoding({ parseOptions: { errors: 'all' } });
  it('should parse valid credit note', async () => {
    await decode.succeed(validCreditNote, {
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
      creditNoteLines: [
        {
          creditedQuantity: { unitCode: 'C62', value: 2 },
          id: '1',
          item: { classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } }, name: 'Widget' },
          lineExtensionAmount: { currencyId: 'EUR', value: 100 },
          price: { priceAmount: { currencyId: 'EUR', value: 50 } },
        },
      ],
      creditNoteTypeCode: '381',
      customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
      documentCurrencyCode: 'EUR',
      id: 'CN-001',
      issueDate: DateTime.makeUnsafe('2024-01-15'),
      legalMonetaryTotal: {
        lineExtensionAmount: { currencyId: 'EUR', value: 100 },
        payableAmount: { currencyId: 'EUR', value: 120 },
        taxExclusiveAmount: { currencyId: 'EUR', value: 100 },
        taxInclusiveAmount: { currencyId: 'EUR', value: 120 },
      },
      profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
      taxTotals: [
        {
          taxAmount: { currencyId: 'EUR', value: 20 },
          taxSubtotals: [
            {
              taxAmount: { currencyId: 'EUR', value: 20 },
              taxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
              taxableAmount: { currencyId: 'EUR', value: 100 },
            },
          ],
        },
      ],
    });
  });

  it('should reject credit note without required id', async () => {
    const { id: _id, ...noId } = validCreditNote;
    await decode.fail(noId, 'Missing key\n  at ["id"]');
  });

  it('should reject credit note without credit note lines', async () => {
    await decode.fail({ ...validCreditNote, creditNoteLines: [] }, 'Expected a value with a length of at least 1\n  at ["creditNoteLines"]');
  });

  it('should reject credit note with invalid credit note type code', async () => {
    await decode.fail({ ...validCreditNote, creditNoteTypeCode: '999' }, 'Expected "81" | "83" | "381" | "396" | "532"\n  at ["creditNoteTypeCode"]');
  });

  it('should reject credit note with invalid issue date', async () => {
    await decode.fail(
      { ...validCreditNote, issueDate: 'not-a-date' },
      'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}Z?$\n  at ["issueDate"]'
    );
  });

  it('should parse credit note with optional fields', async () => {
    await decode.succeed(
      { ...validCreditNote, note: 'Credit note for returned goods', buyerReference: 'ref-001', orderReference: { id: 'PO-001' } },
      {
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
        buyerReference: 'ref-001',
        creditNoteLines: [
          {
            creditedQuantity: { unitCode: 'C62', value: 2 },
            id: '1',
            item: { classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } }, name: 'Widget' },
            lineExtensionAmount: { currencyId: 'EUR', value: 100 },
            price: { priceAmount: { currencyId: 'EUR', value: 50 } },
          },
        ],
        creditNoteTypeCode: '381',
        customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
        documentCurrencyCode: 'EUR',
        id: 'CN-001',
        issueDate: DateTime.makeUnsafe('2024-01-15'),
        legalMonetaryTotal: {
          lineExtensionAmount: { currencyId: 'EUR', value: 100 },
          payableAmount: { currencyId: 'EUR', value: 120 },
          taxExclusiveAmount: { currencyId: 'EUR', value: 100 },
          taxInclusiveAmount: { currencyId: 'EUR', value: 120 },
        },
        note: 'Credit note for returned goods',
        orderReference: { id: 'PO-001' },
        profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
        taxTotals: [
          {
            taxAmount: { currencyId: 'EUR', value: 20 },
            taxSubtotals: [
              {
                taxAmount: { currencyId: 'EUR', value: 20 },
                taxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
                taxableAmount: { currencyId: 'EUR', value: 100 },
              },
            ],
          },
        ],
      }
    );
  });

  it('should apply default customizationId when omitted', async () => {
    const { customizationId: _cid, ...noCustomization } = validCreditNote;
    await decode.succeed(noCustomization, {
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
      creditNoteLines: [
        {
          creditedQuantity: { unitCode: 'C62', value: 2 },
          id: '1',
          item: { classifiedTaxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } }, name: 'Widget' },
          lineExtensionAmount: { currencyId: 'EUR', value: 100 },
          price: { priceAmount: { currencyId: 'EUR', value: 50 } },
        },
      ],
      creditNoteTypeCode: '381',
      customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
      documentCurrencyCode: 'EUR',
      id: 'CN-001',
      issueDate: DateTime.makeUnsafe('2024-01-15'),
      legalMonetaryTotal: {
        lineExtensionAmount: { currencyId: 'EUR', value: 100 },
        payableAmount: { currencyId: 'EUR', value: 120 },
        taxExclusiveAmount: { currencyId: 'EUR', value: 100 },
        taxInclusiveAmount: { currencyId: 'EUR', value: 120 },
      },
      profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
      taxTotals: [
        {
          taxAmount: { currencyId: 'EUR', value: 20 },
          taxSubtotals: [
            {
              taxAmount: { currencyId: 'EUR', value: 20 },
              taxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
              taxableAmount: { currencyId: 'EUR', value: 100 },
            },
          ],
        },
      ],
    });
  });
});
