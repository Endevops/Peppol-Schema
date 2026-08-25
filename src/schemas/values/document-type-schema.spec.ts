import { objectEntries } from 'ts-extras';
import { describe, expect, it } from 'vitest';
import * as z from 'zod/mini';

import { CREDIT_NOTE_DOCTYPE_ID } from '#/constants/credit-note-doctype-id';
import { INVOICE_DOCTYPE_ID } from '#/constants/invoice-doctype-id';
import { documentTypesTable } from '#/values/document-type.generated';

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
      'invalid peppol document type'
    );
  });

  it('rejects a value with an unknown scheme prefix', () => {
    expect(() => documentTypeSchema().parse('unknown-scheme::anything')).toThrow('invalid peppol document type');
  });

  it('rejects a malformed value using the custom error message', () => {
    // A value without the `::` separator fails the template literal, which uses
    // the error parameter supplied to documentTypeSchema.
    expect(() => documentTypeSchema('custom document type error').parse('no-separator')).toThrow('custom document type error');
  });
});

const entries = objectEntries(documentTypesTable);

describe('document-type', () => {
  it.fails('should not contains duplicates', () => {
    expect(
      entries
        .flatMap(([key, values]) => values.map(value => [value, key]))
        .filter(([key], idx, arr) => arr.findIndex(([arrK]) => arrK === key) !== idx)
    ).toEqual([]);
  });

  it.each(entries.flatMap(([key, values]) => values.map(value => [`${key}::${value}`, `${key}::${value}`])) as [[string, string]])(
    'should parse %s as %s',
    (value, expected) => {
      expect(documentTypeSchema().parse(value, { reportInput: true })).toEqual(expected);
    }
  );

  it.each([INVOICE_DOCTYPE_ID, CREDIT_NOTE_DOCTYPE_ID] as const)('should decode a document type without modifying its value (%s)', value => {
    expect(z.decode(documentTypeSchema(), value)).toEqual(value);
  });
});
