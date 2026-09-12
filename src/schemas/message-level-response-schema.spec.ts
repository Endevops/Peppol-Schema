import { describe, it, expect } from 'vitest';
import * as z from 'zod/mini';

import { messageLevelResponse } from './message-level-response-schema';

const validMlr = {
  customizationId: 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
  documentResponse: {
    documentReference: { id: 'ENVELOPE-001' },
    lineResponse: [
      {
        lineReference: { lineId: '/Invoice/cac:InvoiceLine[1]' },
        response: { responseCode: 'RE', description: 'Validation error on line 1', status: { statusReasonCode: 'BV' } },
      },
    ],
    response: { responseCode: 'RE' },
  },
  id: 'MLR-001',
  issueDate: '2024-01-15',
  profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
  receiverParty: { endpointId: { id: '9876543210' } },
  senderParty: { endpointId: { id: '1234567890' } },
};

describe('messageLevelResponse', () => {
  it('should parse valid message level response', () => {
    const result = z.safeParse(messageLevelResponse, validMlr);
    expect(result.success).toBe(true);
  });

  it('should reject MLR without required id', () => {
    const { id: _id, ...noId } = validMlr;
    const result = z.safeParse(messageLevelResponse, noId);
    expect(result.success).toBe(false);
  });

  it('should reject MLR with wrong profileId', () => {
    const result = z.safeParse(messageLevelResponse, { ...validMlr, profileId: 'wrong-profile' });
    expect(result.success).toBe(false);
  });

  it('should reject MLR without issue date', () => {
    const { issueDate: _date, ...noDate } = validMlr;
    const result = z.safeParse(messageLevelResponse, noDate);
    expect(result.success).toBe(false);
  });

  it('should reject MLR with invalid issue date format', () => {
    const result = z.safeParse(messageLevelResponse, { ...validMlr, issueDate: '15/01/2024' });
    expect(result.success).toBe(false);
  });

  it('should parse MLR with optional issue time', () => {
    const result = z.safeParse(messageLevelResponse, { ...validMlr, issueTime: '12:01:34' });
    expect(result.success).toBe(true);
  });

  it('should parse MLR with empty line response array', () => {
    const result = z.safeParse(messageLevelResponse, { ...validMlr, documentResponse: { ...validMlr.documentResponse, lineResponse: [] } });
    expect(result.success).toBe(true);
  });

  it('should reject MLR without sender party', () => {
    const { senderParty: _sender, ...noSender } = validMlr;
    const result = z.safeParse(messageLevelResponse, noSender);
    expect(result.success).toBe(false);
  });
});
