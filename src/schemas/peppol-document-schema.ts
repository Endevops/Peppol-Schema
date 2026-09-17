import type { SchemaAST } from 'effect';

import { Effect, Predicate, Schema, SchemaGetter, SchemaIssue } from 'effect';
import XMLBuilder from 'fast-xml-builder';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolCreditNoteLine } from '#/schemas/fields/peppol-credit-note-line-schema.ts';
import type { PeppolInvoiceLine } from '#/schemas/fields/peppol-invoice-line-schema.ts';

import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id.ts';
import { MESSAGE_LEVEL_RESPONSE_PROFILE_ID } from '#/constants/message-level-response-profile-id.ts';
import { decodeCreditNote } from '#/decoders/decode-credit-note.ts';
import { decodeInvoiceResponse } from '#/decoders/decode-invoice-response.ts';
import { decodeInvoice } from '#/decoders/decode-invoice.ts';
import { decodeMessageLevelResponse } from '#/decoders/decode-message-level-response.ts';
import { encodeCreditNote } from '#/decoders/encode-credit-note.ts';
import { encodeInvoiceResponse } from '#/decoders/encode-invoice-response.ts';
import { encodeInvoice } from '#/decoders/encode-invoice.ts';
import { encodeMessageLevelResponse } from '#/decoders/encode-message-level-response.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';
import { PeppolCreditNote } from '#/schemas/peppol-credit-note-schema.ts';
import { PeppolInvoiceResponse } from '#/schemas/peppol-invoice-response-schema.ts';
import { PeppolInvoice } from '#/schemas/peppol-invoice-schema.ts';
import { PeppolMessageLevelResponse } from '#/schemas/peppol-message-level-response-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { builderOptions } from '#/xml/builder-options.ts';
import { parseXmlNodable } from '#/xml/nodable-parser.ts';

/**
 * @description Object representation of a PEPPOL document, before the member schemas normalise it (dates stay strings, enums stay loose). This is the shape
 * produced by the legacy `#/decoders/*` functions and consumed by their `#/decoders/encode-*` counterparts.
 */
const peppolDocumentObjectSchema = Schema.Union([PeppolInvoice, PeppolCreditNote, PeppolMessageLevelResponse, PeppolInvoiceResponse], {
  mode: 'oneOf',
});

type PeppolDocumentObject = typeof peppolDocumentObjectSchema.Encoded;

const parseXml = (value: string): XmlNode => parseXmlNodable(value);

/**
 * @description Type guard that returns `true` when a decoded value is a {@link PeppolInvoice}.
 *
 * @example
 *   ```ts
 *   isPeppolInvoice(doc); // true for a UBL Invoice
 *   ```;
 *
 * @see {@link PeppolDocumentSchema}
 */
export const isPeppolInvoice = Schema.is(PeppolInvoice);
/**
 * @description Type guard that returns `true` when a decoded value is a {@link PeppolCreditNote}.
 *
 * @example
 *   ```ts
 *   isPeppolCreditNote(doc); // true for a UBL CreditNote
 *   ```;
 *
 * @see {@link PeppolDocumentSchema}
 */
export const isPeppolCreditNote = Schema.is(PeppolCreditNote);
/**
 * @description Type guard that returns `true` when a decoded value is a {@link PeppolMessageLevelResponse}.
 *
 * @example
 *   ```ts
 *   isPeppolMessageLevelResponse(doc); // true for an MLR ApplicationResponse
 *   ```;
 *
 * @see {@link PeppolDocumentSchema}
 */
export const isPeppolMessageLevelResponse = Schema.is(PeppolMessageLevelResponse);
/**
 * @description Type guard that returns `true` when a decoded value is a {@link PeppolInvoiceResponse}.
 *
 * @example
 *   ```ts
 *   isPeppolInvoiceResponse(doc); // true for an invoice response ApplicationResponse
 *   ```;
 *
 * @see {@link PeppolDocumentSchema}
 */
export const isPeppolInvoiceResponse = Schema.is(PeppolInvoiceResponse);

/**
 * @description XML string -> loose document object. Dispatches on the root element; `ApplicationResponse` is further split by its `cbc:ProfileID`.
 */
const decodeDocumentXml = Effect.fn('decode-peppol-document-xml')(function* (value: string, options: SchemaAST.ParseOptions) {
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
  return yield* Effect.fail(new SchemaIssue.InvalidValue({ message: `Unsupported document type: ${rootNodes.join(',')}` }, value, options));
});

/**
 * @description Loose document object -> XML string. Mirrors {@link decodeDocumentXml} by dispatching on the decoded discriminant.
 */
const encodeDocumentXml = Effect.fn('encode-peppol-document-xml')(function* (value: PeppolDocumentObject, options: SchemaAST.ParseOptions) {
  let content: unknown;

  if (isPeppolInvoice(value) || Predicate.hasProperty(value, 'invoiceLines')) {
    content = yield* encodeInvoice(value as never);
  } else if (isPeppolCreditNote(value) || Predicate.hasProperty(value, 'creditNoteLines')) {
    content = yield* encodeCreditNote(value as never);
  } else if (isPeppolMessageLevelResponse(value) || value.profileId === MESSAGE_LEVEL_RESPONSE_PROFILE_ID) {
    content = yield* encodeMessageLevelResponse(value as never);
  } else if (isPeppolInvoiceResponse(value) || value.profileId === INVOICE_RESPONSE_PROFILE_ID) {
    content = yield* encodeInvoiceResponse(value as never);
  } else {
    const rootNodes = Object.keys(value);
    return yield* Effect.fail(
      new SchemaIssue.InvalidValue({ message: `Unsupported document type: ${value.profileId}\n${rootNodes.join(',')}` }, value, options)
    );
  }

  return new XMLBuilder(builderOptions).build(content) as string;
});

/**
 * @description Union of every supported PEPPOL business document. Members discriminate cleanly: invoice vs credit note via `invoiceLines`/`creditNoteLines`,
 * message-level vs invoice response via the `profileId` literal. Decodes and encodes XML strings by dispatching on the root element;
 * `ApplicationResponse` is split on `cbc:ProfileID`.
 *
 * @example
 *   ```ts
 *   const doc = Schema.decodeUnknownSync(PeppolDocumentSchema)(xml); // decoded document union
 *   ```;
 *
 * @see {@link PeppolDocumentDecoded}
 * @see {@link PeppolDocumentEncoded}
 */
export class PeppolDocumentSchema extends opaque<PeppolDocumentSchema>()(
  peppolDocumentObjectSchema.pipe(
    Schema.encodeTo(Schema.String, {
      encode: SchemaGetter.transformEffect((value, options) => encodeDocumentXml(value, options)),
      decode: SchemaGetter.transformEffect((value, options) => decodeDocumentXml(value, options)),
    })
  )
) {}

/**
 * @description Encoded form of {@link PeppolDocumentSchema}: the XML string representation.
 */
export type PeppolDocumentEncoded = Schema.Codec.Encoded<typeof PeppolDocumentSchema>;

/**
 * @description Decoded form of {@link PeppolDocumentSchema}: the union of supported document classes.
 */
export type PeppolDocumentDecoded = Schema.Schema.Type<typeof PeppolDocumentSchema>;

/**
 * @description This defines the types of documents that are sent/received through the peppol network.
 */
export type PeppolDocument = PeppolInvoice | PeppolCreditNote;
/**
 * @description This defines the types of message that are sent/received through the peppol network.
 */
export type PeppolMessage = PeppolMessageLevelResponse | PeppolInvoiceResponse;
/**
 * @description Every document type supported by {@link PeppolDocumentSchema}: the billing documents and the response messages.
 */
export type PeppolAllDocuments = PeppolDocument | PeppolMessage;
/**
 * @description A line from either a {@link PeppolInvoice} or a {@link PeppolCreditNote}.
 */
export type PeppolDocumentLine = PeppolInvoiceLine | PeppolCreditNoteLine;
