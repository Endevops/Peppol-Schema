import { describe, it, expect } from 'vitest'
import { Schema } from 'effect'
import { Invoice } from '#/decoders/effect/invoice'

const validInvoice = {
  customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
  profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
  id: 'INV-001',
  issueDate: '2024-01-15',
  documentCurrencyCode: 'EUR',
  accountingSupplierParty: {
    endpointId: { id: '1234567890', schemeId: '01' },
    postalAddress: {
      streetName: 'Main Street 1',
      cityName: 'London',
      postalZone: 'W1G 8LZ',
      countryCode: { identificationCode: 'GB' },
    },
    partyLegalEntity: { registrationName: 'Seller Company Ltd' },
  },
  accountingCustomerParty: {
    endpointId: { id: '9876543210', schemeId: '01' },
    postalAddress: {
      cityName: 'Paris',
      countryCode: { identificationCode: 'FR' },
    },
    partyLegalEntity: { registrationName: 'Buyer Company SA' },
  },
  taxTotals: [
    {
      taxAmount: { currencyId: 'EUR', value: 200 },
      taxSubtotals: [
        {
          taxAmount: { currencyId: 'EUR', value: 200 },
          taxableAmount: { currencyId: 'EUR', value: 1000 },
          taxCategory: {
            id: 'S',
            percent: 20,
            taxSchemeId: { id: 'VAT' },
          },
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
      item: {
        name: 'Widget',
        classifiedTaxCategory: {
          id: 'S',
          percent: 20,
          taxSchemeId: { id: 'VAT' },
        },
      },
      price: {
        priceAmount: { currencyId: 'EUR', value: 100 },
      },
    },
  ],
  invoiceTypeCode: '380',
}

const decode = Schema.decodeUnknownSync(Invoice)

describe('Invoice (Effect)', () => {
  it('should decode valid invoice', () => {
    const result = decode(validInvoice)
    expect(result).toBeDefined()
    expect(result.id).toBe('INV-001')
  })

  it('should reject invoice without required id', () => {
    const { id: _id, ...noId } = validInvoice
    expect(() => decode(noId)).toThrow()
  })

  it('should reject invoice with invalid invoice type code', () => {
    expect(() => decode({ ...validInvoice, invoiceTypeCode: '999' })).toThrow()
  })

  it('should reject invoice with invalid issue date format', () => {
    expect(() => decode({ ...validInvoice, issueDate: '15-01-2024' })).toThrow()
  })

  it('should decode invoice with optional fields', () => {
    const result = decode({
      ...validInvoice,
      dueDate: '2024-02-15',
      note: 'Test invoice note',
      buyerReference: 'ref-001',
      projectReference: { id: 'PROJ-001' },
    })
    expect(result.dueDate).toBe('2024-02-15')
    expect(result.note).toBe('Test invoice note')
  })

  it('should reject invoice with invalid customizationId prefix', () => {
    expect(() =>
      decode({
        ...validInvoice,
        customizationId: 'invalid-prefix',
      })
    ).toThrow()
  })

  it('should reject invoice with invalid profileId format', () => {
    expect(() =>
      decode({
        ...validInvoice,
        profileId: 'invalid-profile',
      })
    ).toThrow()
  })
})
