import { describe, it, expect } from 'vitest'
import { Schema } from 'effect'
import { MessageLevelResponse } from '#/decoders/effect/message-level-response'

const validMlr = {
  customizationId: 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
  profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
  id: 'MLR-001',
  issueDate: '2024-01-15',
  senderParty: {
    endpointId: { id: '1234567890' },
  },
  receiverParty: {
    endpointId: { id: '9876543210' },
  },
  documentResponse: {
    response: {
      responseCode: 'RE',
    },
    documentReference: {
      id: 'ENVELOPE-001',
    },
    lineResponse: [
      {
        lineReference: { lineId: '/Invoice/cac:InvoiceLine[1]' },
        response: {
          responseCode: 'RE',
          description: 'Validation error on line 1',
          status: {
            statusReasonCode: 'BV',
          },
        },
      },
    ],
  },
}

const decode = Schema.decodeUnknownSync(MessageLevelResponse)

describe('MessageLevelResponse (Effect)', () => {
  it('should decode valid message level response', () => {
    const result = decode(validMlr)
    expect(result).toBeDefined()
    expect(result.id).toBe('MLR-001')
  })

  it('should reject MLR without required id', () => {
    const { id: _id, ...noId } = validMlr
    expect(() => decode(noId)).toThrow()
  })

  it('should reject MLR with wrong profileId', () => {
    expect(() =>
      decode({
        ...validMlr,
        profileId: 'wrong-profile',
      })
    ).toThrow()
  })

  it('should reject MLR without issue date', () => {
    const { issueDate: _date, ...noDate } = validMlr
    expect(() => decode(noDate)).toThrow()
  })

  it('should reject MLR with invalid issue date format', () => {
    expect(() =>
      decode({
        ...validMlr,
        issueDate: '15/01/2024',
      })
    ).toThrow()
  })

  it('should decode MLR with optional issue time', () => {
    const result = decode({
      ...validMlr,
      issueTime: '12:01:34',
    })
    expect(result.issueTime).toBe('12:01:34')
  })

  it('should decode MLR with empty line response array', () => {
    const result = decode({
      ...validMlr,
      documentResponse: {
        ...validMlr.documentResponse,
        lineResponse: [],
      },
    })
    expect(result.documentResponse.lineResponse).toEqual([])
  })

  it('should reject MLR without sender party', () => {
    const { senderParty: _sender, ...noSender } = validMlr
    expect(() => decode(noSender)).toThrow()
  })
})
