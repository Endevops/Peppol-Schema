import { assert, describe, expect, it } from '@effect/vitest';
import { Effect, Result, Schema } from 'effect';
import path from 'node:path';

import { PeppolCreditNote } from '#/schemas/peppol-credit-note-schema.ts';
import { PeppolDocumentSchema } from '#/schemas/peppol-document-schema.ts';
import { PeppolInvoiceResponse } from '#/schemas/peppol-invoice-response-schema.ts';
import { PeppolInvoice } from '#/schemas/peppol-invoice-schema.ts';
import { PeppolMessageLevelResponse } from '#/schemas/peppol-message-level-response-schema.ts';

describe('effect/document-parser', () => {
  const decodeDocument = Schema.decodeEffect(PeppolDocumentSchema, { reportInput: true, errors: 'all', concurrency: 'unbounded' });
  const encodeDocument = Schema.encodeEffect(PeppolDocumentSchema, { reportInput: true, errors: 'all', concurrency: 'unbounded' });

  it.effect.each([
    ['#/test/files/v3/invoice/base-example.xml', PeppolInvoice],
    ['#/test/files/v3/credit-note/base-creditnote-correction.xml', PeppolCreditNote],
    ['#/test/files/v3/message-level-response/MessageLevelResponseExample.xml', PeppolMessageLevelResponse],
    ['#/test/files/v3/invoice-response/InvoiceResponseExample.xml', PeppolInvoiceResponse],
  ] as const)(
    'decodes %s',
    Effect.fn(function* ([file, type]) {
      const xml = yield* Effect.promise(async () => await import(`${file}?raw`).then(i => i.default));
      const doc = yield* decodeDocument(xml);
      assert(Schema.is(type)(doc));
    })
  );

  describe('invalid documents', () => {
    it.effect(
      'throws for an unknown root',
      Effect.fn(function* () {
        const result = yield* decodeDocument('<Unknown><x/></Unknown>').pipe(Effect.result);
        assert(Result.isFailure(result));
      })
    );

    it.effect(
      'throws for an ApplicationResponse with an unrecognized profile',
      Effect.fn(function* () {
        const result = yield* decodeDocument('<ApplicationResponse><cbc:ProfileID>urn:not:profile</cbc:ProfileID></ApplicationResponse>').pipe(
          Effect.result
        );
        assert(Result.isFailure(result));
      })
    );
  });

  describe('with 0 based element', async () => {
    const file = `#/test/files/v3/invoice/zero-based.xml`;
    const fileContent = await import(`${file}?raw`).then(i => i.default);

    it.effect(
      'should parse the customer endpoint successfully',
      Effect.fn(function* () {
        const value = (yield* decodeDocument(fileContent)) as PeppolInvoice;
        expect(value.accountingSupplierParty.endpointId?.id).toEqual('0833629678');
      })
    );
  });

  describe('for file from as4 endpoint', async () => {
    const file = `#/test/files/v3/invoice/from-as4.xml`;
    const basename = path.basename(file, path.extname(file));
    const fileContent = await import(`${file}?raw`).then(i => i.default);

    it.effect(
      'should parse the document from the filesystem',
      Effect.fn(function* () {
        // oxlint-disable-next-line effecttsgo/prefer-schema-over-json -- JSON round-trip normalises DateTime instances for a stable snapshot
        expect(JSON.parse(JSON.stringify(yield* decodeDocument(fileContent)))).toMatchSnapshot('decoded');
      })
    );

    it.effect(
      `should match the defined xml ${basename}`,
      Effect.fn(function* () {
        const content = yield* encodeDocument(yield* decodeDocument(fileContent));
        // oxlint-disable-next-line effecttsgo/prefer-schema-over-json -- JSON round-trip normalises DateTime instances for a stable snapshot
        expect(JSON.parse(JSON.stringify(content))).toMatchSnapshot('encoded');
      })
    );
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
  ])('file (%s)', async file => {
    const xml = await import(`${file}?raw`).then(i => i.default);
    it.effect(
      'decode should match snapshot',
      Effect.fn(function* () {
        const decoded = yield* decodeDocument(xml);
        expect(decoded).toMatchSnapshot('decoded');
      })
    );

    it.effect(
      'encode should match snapshot',
      Effect.fn(function* () {
        const decoded = yield* decodeDocument(xml);
        const encoded = yield* encodeDocument(decoded);
        expect(encoded).toMatchSnapshot('encoded');
      })
    );

    it.effect(
      'round-trips through encode',
      Effect.fn(function* () {
        const decoded = yield* decodeDocument(xml);
        const encoded = yield* encodeDocument(decoded);

        expect(encoded).toMatchXML(xml);
      })
    );
  });
});
