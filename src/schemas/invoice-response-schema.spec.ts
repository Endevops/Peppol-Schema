import { describe, it, expect } from 'vitest';
import * as z from 'zod/mini';

import { invoiceResponseSchema } from './invoice-response-schema';

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
  receiverParty: { endpointId: { id: '9876543210' }, partyLegalEntity: { registrationName: 'Receiver Company' } },
  documentResponse: {
    response: { responseCode: 'AP', effectiveDate: '2024-01-16' },
    documentReference: { id: 'INV-001', issueDate: '2024-01-15', documentTypeCode: '380' },
  },
};

describe('invoiceResponseSchema', () => {
  it('should parse valid invoice response', () => {
    const result = z.safeParse(invoiceResponseSchema, validInvoiceResponse);
    expect(result.success).toBe(true);
  });

  it('should reject invoice response without required id', () => {
    const { id: _id, ...noId } = validInvoiceResponse;
    const result = z.safeParse(invoiceResponseSchema, noId);
    expect(result.success).toBe(false);
  });

  it('should reject invoice response with wrong profileId', () => {
    const result = z.safeParse(invoiceResponseSchema, { ...validInvoiceResponse, profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3' });
    expect(result.success).toBe(false);
  });

  it('should reject invoice response without sender party', () => {
    const { senderParty: _sender, ...noSender } = validInvoiceResponse;
    const result = z.safeParse(invoiceResponseSchema, noSender);
    expect(result.success).toBe(false);
  });

  it('should reject invoice response without document response', () => {
    const { documentResponse: _dr, ...noDr } = validInvoiceResponse;
    const result = z.safeParse(invoiceResponseSchema, noDr);
    expect(result.success).toBe(false);
  });

  it('should parse invoice response with rejection status', () => {
    const result = z.safeParse(invoiceResponseSchema, {
      ...validInvoiceResponse,
      documentResponse: {
        ...validInvoiceResponse.documentResponse,
        response: { responseCode: 'RE', effectiveDate: '2024-01-16', status: [{ statusReason: 'Invalid VAT number' }] },
      },
    });
    expect(result.success).toBe(true);
  });

  it('should parse invoice response with optional note', () => {
    const result = z.safeParse(invoiceResponseSchema, { ...validInvoiceResponse, note: 'Please correct the VAT number' });
    expect(result.success).toBe(true);
  });

  it('should reject invoice response with invalid issue date', () => {
    const result = z.safeParse(invoiceResponseSchema, { ...validInvoiceResponse, issueDate: 'not-a-date' });
    expect(result.success).toBe(false);
  });
});
