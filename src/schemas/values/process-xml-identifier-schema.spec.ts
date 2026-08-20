import { describe, expect, it } from 'vitest';

import { processXmlIdentifierSchema } from './process-xml-identifier-schema';

describe('processXmlIdentifierSchema', () => {
  it('accepts a valid process identifier object', () => {
    const value = { '#text': 'urn:www.cenbii.eu:profile:bii01:ver1.0', '@scheme': 'cenbii-procid-ubl' };
    expect(processXmlIdentifierSchema().parse(value)).toEqual(value);
  });

  it('rejects an unknown scheme', () => {
    expect(() => processXmlIdentifierSchema().parse({ '#text': 'urn:www.cenbii.eu:profile:bii01:ver1.0', '@scheme': 'unknown-scheme' })).toThrow(
      'invalid Peppol document identifier'
    );
  });

  it('rejects an unknown process value for a known scheme', () => {
    expect(() => processXmlIdentifierSchema().parse({ '#text': 'urn:fake:process', '@scheme': 'cenbii-procid-ubl' })).toThrow(
      'invalid Peppol document identifier'
    );
  });

  it('uses a custom error message when provided', () => {
    expect(() =>
      processXmlIdentifierSchema('custom identifier error').parse({ '#text': 'urn:fake:process', '@scheme': 'cenbii-procid-ubl' })
    ).toThrow('custom identifier error');
  });
});
