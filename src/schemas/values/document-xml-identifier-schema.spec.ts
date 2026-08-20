import { describe, expect, it } from 'vitest';

import { INVOICE_DOCTYPE_ID } from '#/constants/invoice-doctype-id';

import { documentXmlIdentifierSchema } from './document-xml-identifier-schema';

const VALID_VALUE = INVOICE_DOCTYPE_ID.replace('busdox-docid-qns::', '');

describe('documentXmlIdentifierSchema', () => {
  it('accepts a valid document identifier object', () => {
    expect(documentXmlIdentifierSchema().parse({ '#text': VALID_VALUE, '@scheme': 'busdox-docid-qns' })).toEqual({
      '#text': VALID_VALUE,
      '@scheme': 'busdox-docid-qns',
    });
  });

  it('rejects an unknown scheme', () => {
    expect(() => documentXmlIdentifierSchema().parse({ '#text': VALID_VALUE, '@scheme': 'unknown-scheme' })).toThrow(
      'invalid Peppol document identifier'
    );
  });

  it('rejects an unknown document type value for a known scheme', () => {
    expect(() => documentXmlIdentifierSchema().parse({ '#text': 'urn:fake:document:type', '@scheme': 'busdox-docid-qns' })).toThrow(
      'invalid Peppol document identifier'
    );
  });

  it('uses a custom error message when provided', () => {
    expect(() =>
      documentXmlIdentifierSchema('custom identifier error').parse({ '#text': 'urn:fake:document:type', '@scheme': 'busdox-docid-qns' })
    ).toThrow('custom identifier error');
  });
});
