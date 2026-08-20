import { describe, expect, it } from 'vitest';

import { documentTypeSchemesSchema } from './document-type-schemes-schema';

describe('documentTypeSchemesSchema', () => {
  it('accepts a valid document type scheme', () => {
    expect(documentTypeSchemesSchema().parse('busdox-docid-qns')).toBe('busdox-docid-qns');
    expect(documentTypeSchemesSchema().parse('peppol-doctype-wildcard')).toBe('peppol-doctype-wildcard');
  });

  it('rejects an invalid scheme using the default error message', () => {
    expect(() => documentTypeSchemesSchema().parse('invalid-scheme')).toThrow('invalid Peppol document type scheme');
  });

  it('rejects an invalid scheme using a custom error message', () => {
    expect(() => documentTypeSchemesSchema('custom scheme error').parse('invalid-scheme')).toThrow('custom scheme error');
  });
});
