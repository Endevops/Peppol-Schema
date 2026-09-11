import { Schema } from 'effect';
import { describe, expect, it } from 'vitest';

import { PeppolDocumentSchema } from './document-parser';

describe('effect/document-parser', () => {
  it.each([
    ['#/test/files/v3/invoice/base-example.xml', 'invoiceLines'],
    ['#/test/files/v3/credit-note/base-creditnote-correction.xml', 'creditNoteLines'],
    ['#/test/files/v3/message-level-response/MessageLevelResponseExample.xml', 'documentResponse'],
    ['#/test/files/v3/invoice-response/InvoiceResponseExample.xml', 'documentResponse'],
  ])('decodes %s', async (file, key) => {
    const xml = await import(`${file}?raw`).then(i => i.default);
    expect(Schema.decodeSync(PeppolDocumentSchema)(xml)).toMatchObject({ [key]: expect.anything() });
  });

  it('throws for an unknown root', () => {
    expect(() => Schema.decodeSync(PeppolDocumentSchema)('<Unknown><x/></Unknown>')).toThrow('Unsupported document type: Unknown');
  });

  it('throws for an ApplicationResponse with an unrecognized profile', () => {
    const xml = '<ApplicationResponse><cbc:ProfileID>urn:not:profile</cbc:ProfileID></ApplicationResponse>';
    expect(() => Schema.decodeSync(PeppolDocumentSchema)(xml)).toThrow('Unsupported document type: ApplicationResponse');
  });

  it.each([
    '#/test/files/v3/invoice/base-example.xml',
    '#/test/files/v3/credit-note/base-creditnote-correction.xml',
    '#/test/files/v3/message-level-response/MessageLevelResponseExample.xml',
    '#/test/files/v3/invoice-response/InvoiceResponseExample.xml',
  ])('round-trips %s through encode', async file => {
    const xml = await import(`${file}?raw`).then(i => i.default);
    expect(Schema.encodeSync(PeppolDocumentSchema)(Schema.decodeSync(PeppolDocumentSchema)(xml))).toMatchXML(xml);
  });
});
