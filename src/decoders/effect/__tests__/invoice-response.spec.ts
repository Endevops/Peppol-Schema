import { describe, it, expect } from 'vitest'
import { Schema } from 'effect'
import { InvoiceResponse } from '#/decoders/effect/invoice-response'

const validInvoiceResponse = {
  customizationId: 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
  profileId: 'urn:fdc:peppol.eu:poacc:bis:invoice_response:3',
  id: 'IR-001',
  issueDate: '2024-01-15',
  senderParty: {
    endpointId: { id: '1234567890' },
    partyLegalEntity: { registrationName: 'Sender Company' },
    contact: { name: 'John Doe', electronicMail: 'john@example.com' },
  },
  receiverParty: {
    endpointId: { id: '9876543210' },
    partyLegalEntity: { registrationName: 'Receiver Company' },
  },
  documentResponse: {
    response: {
      responseCode: 'AP',
      effectiveDate: '2024-01-16',
    },
    documentReference: {
      id: 'INV-001',
      issueDate: '2024-01-15',
      documentTypeCode: '380',
    },
  },
}

const decode = Schema.decodeUnknownSync(InvoiceResponse)

describe('InvoiceResponse (Effect)', () => {
  it('should decode valid invoice response', () => {
    const result = decode(validInvoiceResponse)
    expect(result).toBeDefined()
    expect(result.id).toBe('IR-001')
  })

  it('should reject invoice response without required id', () => {
    const { id: _id, ...noId } = validInvoiceResponse
    expect(() => decode(noId)).toThrow()
  })

  it('should reject invoice response with wrong profileId', () => {
    expect(() =>
      decode({
        ...validInvoiceResponse,
        profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
      })
    ).toThrow()
  })

  it('should reject invoice response without sender party', () => {
    const { senderParty: _sender, ...noSender } = validInvoiceResponse
    expect(() => decode(noSender)).toThrow()
  })

  it('should reject invoice response without document response', () => {
    const { documentResponse: _dr, ...noDr } = validInvoiceResponse
    expect(() => decode(noDr)).toThrow()
  })

  it('should decode invoice response with rejection status', () => {
    const result = decode({
      ...validInvoiceResponse,
      documentResponse: {
        ...validInvoiceResponse.documentResponse,
        response: {
          responseCode: 'RE',
          effectiveDate: '2024-01-16',
          status: [
            {
              statusReason: 'Invalid VAT number',
            },
          ],
        },
      },
    })
    expect(result).toBeDefined()
  })

  it('should decode invoice response with optional note', () => {
    const result = decode({
      ...validInvoiceResponse,
      note: 'Please correct the VAT number',
    })
    expect(result.note).toBe('Please correct the VAT number')
  })

  it('should reject invoice response with invalid issue date', () => {
    expect(() =>
      decode({
        ...validInvoiceResponse,
        issueDate: 'not-a-date',
      })
    ).toThrow()
  })
})
