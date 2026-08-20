import { describe, expect, it } from 'vitest';

import { INVOICE_DOCTYPE_ID } from '#/constants/invoice-doctype-id';

import { documentTypeValuesSchema } from './document-type-values-schema';

const VALID_VALUE = INVOICE_DOCTYPE_ID.replace('busdox-docid-qns::', '');

describe('documentTypeValuesSchema', () => {
  it('accepts a valid document type value', () => {
    expect(documentTypeValuesSchema().parse(VALID_VALUE)).toBe(VALID_VALUE);
  });

  it('rejects an invalid document type value', () => {
    expect(() => documentTypeValuesSchema().parse('urn:fake:document:type')).toThrow();
  });

  it('rejects a non-string input using the default error message', () => {
    expect(() => documentTypeValuesSchema().parse(42 as unknown as string)).toThrow('invalid Peppol document type value');
  });

  it('rejects a non-string input using a custom error message', () => {
    expect(() => documentTypeValuesSchema('custom value error').parse(42 as unknown as string)).toThrow('custom value error');
  });
});
