import { Schema } from 'effect';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import type { PeppolInvoice } from '#/effect/peppol-invoice-schema';

import { peppolDocumentSchema } from './peppol-document-schema';

describe('effect/document-parser', () => {
  const decodeDocument = Schema.decodeSync(peppolDocumentSchema);
  const encodeDocument = Schema.encodeSync(peppolDocumentSchema);
  it.each([
    ['#/test/files/v3/invoice/base-example.xml', 'invoiceLines'],
    ['#/test/files/v3/credit-note/base-creditnote-correction.xml', 'creditNoteLines'],
    ['#/test/files/v3/message-level-response/MessageLevelResponseExample.xml', 'documentResponse'],
    ['#/test/files/v3/invoice-response/InvoiceResponseExample.xml', 'documentResponse'],
  ])('decodes %s', async (file, key) => {
    const xml = await import(`${file}?raw`).then(i => i.default);
    expect(decodeDocument(xml)).toMatchObject({ [key]: expect.anything() });
  });

  describe('invalid documents', () => {
    it('throws for an unknown root', () => {
      expect(() => decodeDocument('<Unknown><x/></Unknown>')).toThrow('Unsupported document type: Unknown');
    });

    it('throws for an ApplicationResponse with an unrecognized profile', () => {
      const xml = '<ApplicationResponse><cbc:ProfileID>urn:not:profile</cbc:ProfileID></ApplicationResponse>';
      expect(() => decodeDocument(xml)).toThrow('Unsupported document type: ApplicationResponse');
    });
  });

  describe('with 0 based element', async () => {
    const file = `#/test/files/v3/invoice/zero-based.xml`;
    const fileContent = await import(`${file}?raw`).then(i => i.default);

    it('should parse the customer endpoint successfully', () => {
      const value = decodeDocument(fileContent) as PeppolInvoice;
      expect(value.accountingSupplierParty.endpointId?.id).toEqual('0833629678');
    });
  });

  describe('for file from as4 endpoint', async () => {
    const file = `#/test/files/v3/invoice/from-as4.xml`;
    const basename = path.basename(file, path.extname(file));
    const fileContent = await import(`${file}?raw`).then(i => i.default);

    it('should parse the document from the filesystem', async () => {
      expect(JSON.parse(JSON.stringify(decodeDocument(fileContent)))).toMatchSnapshot();
    });

    it(`should match the defined xml ${basename}`, () => {
      const content = encodeDocument(decodeDocument(fileContent));
      expect(JSON.parse(JSON.stringify(content))).toMatchSnapshot();
    });
  });

  describe.each([
    '#/test/files/v3/invoice-response/InvoiceResponseExample.xml',
    '#/test/files/v3/invoice-response/T111-uc001-Invoice in process.xml',
    '#/test/files/v3/invoice-response/T111-uc002a-Additional reference data.xml',
    '#/test/files/v3/invoice-response/T111-uc002b-In process but postponed.xml',
    '#/test/files/v3/invoice-response/T111-uc003-Invoice is accepted.xml',
    '#/test/files/v3/invoice-response/T111-uc004a-Invoice is rejected.xml',
    '#/test/files/v3/invoice-response/T111-uc004b-Rejected requesting reissue.xml',
    '#/test/files/v3/invoice-response/T111-uc004c-Rejected requesting replacement.xml',
    '#/test/files/v3/invoice-response/T111-uc005-Invoice is conditionally accepted.xml',
    '#/test/files/v3/invoice-response/T111-uc006a-Under query missing information.xml',
    '#/test/files/v3/invoice-response/T111-uc006b-Missing PO.xml',
    '#/test/files/v3/invoice-response/T111-uc006c-Wrong detail partial credit.xml',
    '#/test/files/v3/invoice-response/T111-uc007-Payment has been initiated.xml',
    '#/test/files/v3/invoice-response/T111-uc008-Invoice is accepted by third party.xml',
    '#/test/files/v3/message-level-response/MessageLevelResponseExample.xml',
    '#/test/files/v3/credit-note/base-creditnote-correction.xml',
    '#/test/files/v3/invoice/Allowance-example.xml',
    '#/test/files/v3/invoice/Vat-category-S.xml',
    '#/test/files/v3/invoice/base-example.xml',
    '#/test/files/v3/invoice/base-negative-inv-correction.xml',
    '#/test/files/v3/invoice/vat-category-E.xml',
    '#/test/files/v3/invoice/vat-category-O.xml',
    '#/test/files/v3/invoice/vat-category-Z.xml',
  ])('round trips (%s)', async file => {
    const xml = await import(`${file}?raw`).then(i => i.default);
    it('decode should match inline snapshot', () => {
      const encoded = decodeDocument(xml);
      expect(encoded).toMatchSnapshot();
    });

    it('encode should match inline snapshot', () => {
      const decoded = decodeDocument(xml);
      const encoded = encodeDocument(decoded);
      expect(encoded).toMatchSnapshot();
    });

    it('round-trips through encode', async () => {
      const decoded = decodeDocument(xml);
      const encoded = encodeDocument(decoded);

      expect(encoded).toMatchXML(xml);
    });
  });
});
