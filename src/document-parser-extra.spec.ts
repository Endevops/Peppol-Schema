import { describe, expect, it } from 'vitest';
import * as z from 'zod/mini';

import { documentParser } from './document-parser';

describe('documentParser branch coverage', () => {
  it('decode: throws for an unknown root (ApplicationResponse falsy)', () => {
    expect(() => z.decode(documentParser, '<Unknown><x/></Unknown>')).toThrow('Unsupported document type: Unknown');
    // A self-closing <Invoice/> parses to an empty string, so parsed.Invoice is falsy
    expect(() => z.decode(documentParser, '<Invoice/>')).toThrow('Unsupported document type: Invoice');
  });

  it('decode: throws for an ApplicationResponse with an unrecognized profile', () => {
    const xml = '<ApplicationResponse><cbc:ProfileID>urn:not:profile</cbc:ProfileID></ApplicationResponse>';
    expect(() => z.decode(documentParser, xml)).toThrow('Unsupported document type: ApplicationResponse');
  });

  it('encode: leaves content undefined when no document root is recognized', () => {
    const rev = (documentParser as unknown as { _zod: { def: { reverseTransform: (value: unknown) => unknown } } })._zod.def.reverseTransform;

    // A value with none of invoiceLines / creditNoteLines / documentResponse
    expect(() => rev({})).toThrow();

    // A value with documentResponse but a profileId that is neither message-level nor invoice-response
    expect(() => rev({ documentResponse: [], profileId: 'urn:not:profile' })).toThrow();
  });
});
