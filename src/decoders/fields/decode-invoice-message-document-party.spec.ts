import { describe, expect, it } from 'vitest';

import { decodeInvoiceMessageDocumentParty } from './decode-invoice-message-document-party';

describe('decodeInvoiceMessageDocumentParty', () => {
  it('returns undefined when the party path is missing', () => {
    const result = decodeInvoiceMessageDocumentParty({}, 'cac:AccountingCustomerParty');

    expect(result).toBeUndefined();
  });

  it('decodes a party node with a party name', () => {
    const result = decodeInvoiceMessageDocumentParty(
      { 'cac:AccountingCustomerParty': { 'cac:PartyIdentification': { 'cbc:ID': 'DOC-PI' }, 'cac:PartyName': { 'cbc:Name': 'Receiver AS' } } },
      'cac:AccountingCustomerParty'
    );

    expect(result).toEqual({ partyIdentification: { id: 'DOC-PI' }, partyName: { name: 'Receiver AS' } });
  });

  it('decodes a party node without a party name to an undefined party name', () => {
    const result = decodeInvoiceMessageDocumentParty(
      { 'cac:AccountingCustomerParty': { 'cac:PartyIdentification': { 'cbc:ID': 'DOC-PI' } } },
      'cac:AccountingCustomerParty'
    );

    expect(result).toEqual({ partyIdentification: { id: 'DOC-PI' }, partyName: undefined });
  });
});
