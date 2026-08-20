import { describe, expect, it } from 'vitest';

import { INVOICE_DOCTYPE_ID } from '#/constants/invoice-doctype-id';

import { documentTypeSchema } from './document-type-schema';

describe('documentTypeSchema (invalid prefixes)', () => {
  it('accepts the invoice document type id', () => {
    expect(documentTypeSchema().parse(INVOICE_DOCTYPE_ID)).toBe(INVOICE_DOCTYPE_ID);
  });

  it('rejects a value whose prefix starts with a scheme but is not an exact table key', () => {
    // `busdox-docid-qnsXYZ` passes the startsWith refinement of the first
    // template segment but is not a key of the documentTypesTable, so the
    // `entries.find(...) ?? []` fallback is exercised.
    expect(() => documentTypeSchema().parse('busdox-docid-qnsXYZ::urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice')).toThrow(
      'invalid document type value'
    );
  });

  it('rejects a value with an unknown scheme prefix', () => {
    expect(() => documentTypeSchema().parse('unknown-scheme::anything')).toThrow('invalid document type value');
  });

  it('rejects a malformed value using the custom error message', () => {
    // A value without the `::` separator fails the template literal, which uses
    // the error parameter supplied to documentTypeSchema.
    expect(() => documentTypeSchema('custom document type error').parse('no-separator')).toThrow('custom document type error');
  });
});
