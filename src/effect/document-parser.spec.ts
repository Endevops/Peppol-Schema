import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeDocumentEffect, decodeDocumentSync, encodeDocumentEffect, encodeDocumentSync } from './document-parser';

describe('effect/document-parser', () => {
  it.each([
    ['#/test/files/v3/invoice/base-example.xml', 'invoiceLines'],
    ['#/test/files/v3/credit-note/base-creditnote-correction.xml', 'creditNoteLines'],
    ['#/test/files/v3/message-level-response/MessageLevelResponseExample.xml', 'documentResponse'],
    ['#/test/files/v3/invoice-response/InvoiceResponseExample.xml', 'documentResponse'],
  ])('decodes %s', async (file, key) => {
    const xml = await import(`${file}?raw`).then(i => i.default);
    expect(decodeDocumentSync(xml)).toMatchObject({ [key]: expect.anything() });
  });

  it('throws for an unknown root', () => {
    expect(() => decodeDocumentSync('<Unknown><x/></Unknown>')).toThrow('Unsupported document type: Unknown');
  });

  it('throws for an ApplicationResponse with an unrecognized profile', () => {
    const xml = '<ApplicationResponse><cbc:ProfileID>urn:not:profile</cbc:ProfileID></ApplicationResponse>';
    expect(() => decodeDocumentSync(xml)).toThrow('Unsupported document type: ApplicationResponse');
  });

  it.each([
    '#/test/files/v3/invoice/base-example.xml',
    '#/test/files/v3/credit-note/base-creditnote-correction.xml',
    '#/test/files/v3/message-level-response/MessageLevelResponseExample.xml',
    '#/test/files/v3/invoice-response/InvoiceResponseExample.xml',
  ])('round-trips %s through encode', async file => {
    const xml = await import(`${file}?raw`).then(i => i.default);
    expect(encodeDocumentSync(decodeDocumentSync(xml))).toMatchXML(xml);
  });

  it('exposes Effect variants for decode and encode', async () => {
    const xml = await import('#/test/files/v3/message-level-response/MessageLevelResponseExample.xml?raw').then(i => i.default);
    const document = await Effect.runPromise(decodeDocumentEffect(xml));
    expect('documentResponse' in document).toBe(true);
    expect(await Effect.runPromise(encodeDocumentEffect(document))).toMatchXML(xml);
    await expect(Effect.runPromise(decodeDocumentEffect('<Unknown/>'))).rejects.toThrow();
  });
});
