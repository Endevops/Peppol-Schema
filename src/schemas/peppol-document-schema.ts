import type { SchemaAST } from 'effect';
import type { AllUnionFields } from 'type-fest';

import { Effect, Predicate, Schema, SchemaGetter, SchemaIssue } from 'effect';
import XMLBuilder from 'fast-xml-builder';
import { XMLParser } from 'fast-xml-parser';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolCreditNoteLine } from '#/schemas/fields/peppol-credit-note-line-schema';
import type { PeppolInvoiceLine } from '#/schemas/fields/peppol-invoice-line-schema';

import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id';
import { MESSAGE_LEVEL_RESPONSE_PROFILE_ID } from '#/constants/message-level-response-profile-id';
import { decodeCreditNote } from '#/decoders/decode-credit-note';
import { decodeInvoice } from '#/decoders/decode-invoice';
import { decodeInvoiceResponse } from '#/decoders/decode-invoice-response';
import { decodeMessageLevelResponse } from '#/decoders/decode-message-level-response';
import { encodeCreditNote } from '#/decoders/encode-credit-note';
import { encodeInvoice } from '#/decoders/encode-invoice';
import { encodeInvoiceResponse } from '#/decoders/encode-invoice-response';
import { encodeMessageLevelResponse } from '#/decoders/encode-message-level-response';
import { strOrUnd } from '#/helpers/str-or-und';
import { PeppolCreditNote } from '#/schemas/peppol-credit-note-schema';
import { PeppolInvoiceResponse } from '#/schemas/peppol-invoice-response-schema';
import { PeppolInvoice } from '#/schemas/peppol-invoice-schema';
import { PeppolMessageLevelResponse } from '#/schemas/peppol-message-level-response-schema';
import { builderOptions } from '#/xml/builder-options';
import { parserOptions } from '#/xml/parser-options';

export class PeppolInvalidDocumentType extends Schema.TaggedError<PeppolInvalidDocumentType>()('PeppolInvalidDocumentType', {
  message: Schema.String,
  rootNodes: Schema.Array(Schema.String),
}) {}

/**
 * @description Object representation of a PEPPOL document, before the member schemas normalise it (dates stay strings, enums stay loose). This is the shape
 * produced by the legacy `#/decoders/*` functions and consumed by their `#/decoders/encode-*` counterparts.
 */
const peppolDocumentObjectSchema = Schema.Union([PeppolInvoice, PeppolCreditNote, PeppolMessageLevelResponse, PeppolInvoiceResponse], {
  mode: 'oneOf',
});

type PeppolDocumentObject = typeof peppolDocumentObjectSchema.Encoded;

const parseXml = (value: string): XmlNode => new XMLParser({ ...parserOptions, removeNSPrefix: true }).parse(value);

const toInvalidValue = (error: { readonly message: string }, input: unknown, options: SchemaAST.ParseOptions) =>
  new SchemaIssue.InvalidValue({ message: error.message }, input, options);

/**
 * @description XML string -> loose document object. Dispatches on the root element; `ApplicationResponse` is further split by its `cbc:ProfileID`.
 */
const decodeDocumentXml = Effect.fn('decode-peppol-document-xml')(function* (value: string) {
  const parsed = parseXml(value);

  if (Predicate.isNotNullish(parsed.Invoice)) {
    return yield* decodeInvoice(parsed);
  }
  if (Predicate.isNotNullish(parsed.CreditNote)) {
    return yield* decodeCreditNote(parsed);
  }
  if (Predicate.isNotNullish(parsed.ApplicationResponse)) {
    const profileId = yield* strOrUnd(parsed.ApplicationResponse, 'cbc:ProfileID');
    if (profileId === MESSAGE_LEVEL_RESPONSE_PROFILE_ID) {
      return yield* decodeMessageLevelResponse(parsed);
    }
    if (profileId === INVOICE_RESPONSE_PROFILE_ID) {
      return yield* decodeInvoiceResponse(parsed);
    }
  }

  const rootNodes = Object.keys(parsed);
  return yield* new PeppolInvalidDocumentType({ message: `Unsupported document type: ${rootNodes.join(',')}`, rootNodes });
});

export const isPeppolInvoice = Schema.is(PeppolInvoice);
export const isPeppolCreditNote = Schema.is(PeppolCreditNote);
export const isPeppolMessageLevelResponse = Schema.is(PeppolMessageLevelResponse);
export const isPeppolInvoiceResponse = Schema.is(PeppolInvoiceResponse);

/**
 * @description Loose document object -> XML string. Mirrors {@link decodeDocumentXml} by dispatching on the decoded discriminant.
 */
const encodeDocumentXml = Effect.fn('encode-peppol-document-xml')(function* (document: PeppolDocumentObject) {
  let content: unknown;

  if (isPeppolInvoice(document)) {
    content = yield* encodeInvoice(document);
  } else if (isPeppolCreditNote(document)) {
    content = yield* encodeCreditNote(document);
  } else if (isPeppolMessageLevelResponse(document)) {
    content = yield* encodeMessageLevelResponse(document);
  } else if (isPeppolInvoiceResponse(document)) {
    content = yield* encodeInvoiceResponse(document);
  } else {
    const rootNodes = Object.keys(document);
    return yield* new PeppolInvalidDocumentType({ message: `Unsupported document type: ${rootNodes.join(',')}`, rootNodes });
  }

  return new XMLBuilder(builderOptions).build(content) as string;
});

/**
 * @description Union of every supported PEPPOL business document. Members discriminate cleanly: invoice vs credit note via `invoiceLines`/`creditNoteLines`,
 * message-level vs invoice response via the `profileId` literal.
 */
export const peppolDocumentSchema = peppolDocumentObjectSchema.pipe(
  Schema.encodeTo(Schema.String, {
    encode: SchemaGetter.transformEffect((document, options) =>
      encodeDocumentXml(document).pipe(
        Effect.catchTags({
          PeppolEncodeError: error => Effect.fail(toInvalidValue(error, document, options)),
          PeppolInvalidDocumentType: error => Effect.fail(toInvalidValue(error, document, options)),
        })
      )
    ),
    decode: SchemaGetter.transformEffect((value, options) =>
      decodeDocumentXml(value).pipe(
        // The legacy decoders emit loose values (e.g. `descriptionCode: string`); the union member below validates and narrows them.
        Effect.map(document => document),
        Effect.catchTags({
          PeppolInvalidDocumentType: error => Effect.fail(toInvalidValue(error, value, options)),
          PeppolNodeError: error => Effect.fail(toInvalidValue(error, value, options)),
        })
      )
    ),
  })
);

export type PeppolDocumentEncoded = Schema.Codec.Encoded<typeof peppolDocumentSchema>;
export interface PeppolDocumentDecoded extends AllUnionFields<Schema.Schema.Type<typeof peppolDocumentSchema>> {}

/**
 * @description This defines the types of documents that are sent/received through the peppol network.
 */
export type PeppolDocument = PeppolInvoice | PeppolCreditNote;
/**
 * @description This defines the types of message that are sent/received through the peppol network.
 */
export type PeppolMessage = PeppolMessageLevelResponse | PeppolInvoiceResponse;
export type PeppolAllDocuments = PeppolDocument | PeppolMessage;
export type PeppolDocumentLine = PeppolInvoiceLine | PeppolCreditNoteLine;
