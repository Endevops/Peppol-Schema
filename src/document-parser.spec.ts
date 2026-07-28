// oxlint-disable vitest/no-conditional-expect
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as z from 'zod/mini';

import type { PeppolInvoice } from './schemas/invoice';

import { documentParser } from './document-parser';

describe('document-parser', () => {
  const files = [
    './../test/files/v3/invoice-response/InvoiceResponseExample.xml',
    './../test/files/v3/invoice-response/T111-uc001-Invoice in process.xml',
    './../test/files/v3/invoice-response/T111-uc002a-Additional reference data.xml',
    './../test/files/v3/invoice-response/T111-uc002b-In process but postponed.xml',
    './../test/files/v3/invoice-response/T111-uc003-Invoice is accepted.xml',
    './../test/files/v3/invoice-response/T111-uc004a-Invoice is rejected.xml',
    './../test/files/v3/invoice-response/T111-uc004b-Rejected requesting reissue.xml',
    './../test/files/v3/invoice-response/T111-uc004c-Rejected requesting replacement.xml',
    './../test/files/v3/invoice-response/T111-uc005-Invoice is conditionally accepted.xml',
    './../test/files/v3/invoice-response/T111-uc006a-Under query missing information.xml',
    './../test/files/v3/invoice-response/T111-uc006b-Missing PO.xml',
    './../test/files/v3/invoice-response/T111-uc006c-Wrong detail partial credit.xml',
    './../test/files/v3/invoice-response/T111-uc007-Payment has been initiated.xml',
    './../test/files/v3/invoice-response/T111-uc008-Invoice is accepted by third party.xml',
    './../test/files/v3/message-level-response/MessageLevelResponseExample.xml',
    './../test/files/v3/credit-note/base-creditnote-correction.xml',
    './../test/files/v3/invoice/Allowance-example.xml',
    './../test/files/v3/invoice/Vat-category-S.xml',
    './../test/files/v3/invoice/base-example.xml',
    './../test/files/v3/invoice/base-negative-inv-correction.xml',
    './../test/files/v3/invoice/vat-category-E.xml',
    './../test/files/v3/invoice/vat-category-O.xml',
    './../test/files/v3/invoice/vat-category-Z.xml',
  ] as const;

  function decode(content: string) {
    const result = z.safeDecode(documentParser, content, { reportInput: true });
    if (!result.success) {
      const issue = result.error.issues[0] as z.core.$ZodIssueInvalidUnion;
      const message = issue.errors

        .map(e => {
          const error = new z.core.$ZodError(e);
          return `-> ${z.prettifyError(error)}`;
        })
        .join('\n\n');
      expect.fail(message);
    }
    return result.data;
  }

  // this test must be specific since it adds @ns to every elements
  describe('for file from as4 endpoint', async () => {
    const file = `${import.meta.dir}/../test/files/v3/invoice/from-as4.xml`;
    const filename = path.resolve(file);
    const basename = path.basename(file, path.extname(file));
    const fileContent = await import(`${filename}?raw`).then(i => i.default);

    it('should parse the document from the filesystem', async () => {
      expect(JSON.parse(JSON.stringify(decode(fileContent)))).toMatchSnapshot();
    });

    it(`should match the defined xml ${basename}`, () => {
      const content = z.encode(documentParser, decode(fileContent));
      expect(JSON.parse(JSON.stringify(content))).toMatchSnapshot();
    });
  });

  describe('with 0 based element', async () => {
    const file = `${import.meta.dir}/../test/files/v3/invoice/zero-based.xml`;
    const filename = path.resolve(file);
    const fileContent = await import(`${filename}?raw`).then(i => i.default);

    it('should parse the customer endpoint successfully', () => {
      const value = decode(fileContent) as PeppolInvoice;
      expect(value.accountingSupplierParty.endpointId?.id).toEqual('0833629678');
    });
  });

  describe.each(files)('for file $0', async file => {
    const filename = path.resolve(import.meta.dirname, file);
    const basename = path.basename(file, path.extname(file));
    const fileContent = await import(`${filename}?raw`).then(i => i.default);

    it('should parse the document from the filesystem', async () => {
      expect(JSON.parse(JSON.stringify(decode(fileContent)))).toMatchSnapshot();
    });

    it(`should match the defined xml ${basename}`, () => {
      const content = z.encode(documentParser, decode(fileContent));
      expect(content).toMatchXML(fileContent);
      expect(JSON.parse(JSON.stringify(content))).toMatchSnapshot();
    });
  });
});
