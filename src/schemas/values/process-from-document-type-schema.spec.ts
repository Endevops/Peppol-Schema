import { describe, expect, it } from 'vitest';

import { INVOICE_DOCTYPE_ID } from '#/constants/invoice-doctype-id';

import { processFromDocumentTypeSchema } from './process-from-document-type-schema';

const VALID_DOC_TYPE = INVOICE_DOCTYPE_ID;
const KNOWN_PROCESS = 'cenbii-procid-ubl::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0';

describe('processFromDocumentTypeSchema', () => {
  it('accepts a process identifier valid for the given document type', () => {
    expect(processFromDocumentTypeSchema(VALID_DOC_TYPE).parse(KNOWN_PROCESS)).toBe(KNOWN_PROCESS);
  });

  it('rejects a process identifier invalid for the given document type', () => {
    expect(() => processFromDocumentTypeSchema(VALID_DOC_TYPE).parse('cenbii-procid-ubl::urn:not:a:process')).toThrow();
  });

  it('rejects a malformed process identifier using the custom error message', () => {
    expect(() => processFromDocumentTypeSchema(VALID_DOC_TYPE, 'custom process error').parse('no-separator')).toThrow('custom process error');
  });

  it('falls back to the generic process schema when the document type has no processes', () => {
    const schema = processFromDocumentTypeSchema('unknown-document-type' as never);
    expect(schema.parse('cenbii-procid-ubl::urn:www.cenbii.eu:profile:bii01:ver1.0')).toBe(
      'cenbii-procid-ubl::urn:www.cenbii.eu:profile:bii01:ver1.0'
    );
    expect(() => schema.parse('cenbii-procid-ubl::urn:not:a:process')).toThrow();
  });
});
