import type { SchemaAST } from 'effect';
import type { AllUnionFields } from 'type-fest';

import { Effect, Predicate, Schema, SchemaGetter, SchemaIssue } from 'effect';
import XMLBuilder from 'fast-xml-builder';
import { XMLParser } from 'fast-xml-parser';

import type { PeppolCreditNoteLine } from '#/effect/fields/peppol-credit-note-line-schema';
import type { PeppolInvoiceLine } from '#/effect/fields/peppol-invoice-line-schema';
import type { PeppolCreditNote } from '#/effect/peppol-credit-note-schema';
import type { PeppolInvoice } from '#/effect/peppol-invoice-schema';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolCreditNote as ZodPeppolCreditNote } from '#/schemas/credit-note';
import type { PeppolInvoice as ZodPeppolInvoice } from '#/schemas/invoice';
import type { PeppolInvoiceResponse as ZodPeppolInvoiceResponse } from '#/schemas/invoice-response-schema';
import type { PeppolMessageLevelResponse as ZodPeppolMessageLevelResponse } from '#/schemas/message-level-response-schema';

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
import { peppolCreditNoteSchema } from '#/effect/peppol-credit-note-schema';
import { peppolInvoiceResponseSchema } from '#/effect/peppol-invoice-response-schema';
import { peppolInvoiceSchema } from '#/effect/peppol-invoice-schema';
import { peppolMessageLevelResponseSchema } from '#/effect/peppol-message-level-response-schema';
import { strOrUnd } from '#/helpers/str-or-und';
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
const peppolDocumentObjectSchema = Schema.Union([
  peppolInvoiceSchema,
  peppolCreditNoteSchema,
  peppolMessageLevelResponseSchema,
  peppolInvoiceResponseSchema,
]);

type PeppolDocumentObject = typeof peppolDocumentObjectSchema.Encoded;

const parseXml = (value: string): XmlNode => new XMLParser({ ...parserOptions, removeNSPrefix: true }).parse(value);

const toInvalidValue = (error: { readonly message: string }, input: unknown, options: SchemaAST.ParseOptions) =>
  new SchemaIssue.InvalidValue({ message: error.message }, input, options);

/**
 * @description XML string -> loose document object. Dispatches on the root element; `ApplicationResponse` is further split by its `cbc:ProfileID`.
 */
const decodeDocumentXml = Effect.fn(function* (value: string) {
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

/**
 * @description Loose document object -> XML string. Mirrors {@link decodeDocumentXml} by dispatching on the decoded discriminant.
 */
const encodeDocumentXml = Effect.fn(function* (document: PeppolDocumentObject) {
  let content: unknown;

  if (Predicate.hasProperty(document, 'invoiceLines')) {
    content = yield* encodeInvoice(document as unknown as ZodPeppolInvoice);
  } else if (Predicate.hasProperty(document, 'creditNoteLines')) {
    content = yield* encodeCreditNote(document as unknown as ZodPeppolCreditNote);
  } else if (Predicate.hasProperty(document, 'documentResponse')) {
    if (document.profileId === MESSAGE_LEVEL_RESPONSE_PROFILE_ID) {
      content = yield* encodeMessageLevelResponse(document as unknown as ZodPeppolMessageLevelResponse);
    } else if (document.profileId === INVOICE_RESPONSE_PROFILE_ID) {
      content = yield* encodeInvoiceResponse(document as unknown as ZodPeppolInvoiceResponse);
    }
  }

  if (Predicate.isNullish(content)) {
    const rootNodes = Object.keys(document);
    return yield* new PeppolInvalidDocumentType({ message: `Unsupported document type: ${rootNodes.join(',')}`, rootNodes });
  }

  return new XMLBuilder(builderOptions).build(content) as string;
});

/**
 * @description Union of every supported PEPPOL business document (Effect port of the `z.xor` side of `documentParser`). Members discriminate cleanly: invoice vs
 * credit note via `invoiceLines`/`creditNoteLines`, message-level vs invoice response via the `profileId` literal.
 */
export const peppolDocumentSchema = peppolDocumentObjectSchema.pipe(
  Schema.encodeTo(Schema.String, {
    encode: SchemaGetter.transformEffect((document, options) =>
      encodeDocumentXml(document).pipe(Effect.mapError(error => toInvalidValue(error, document, options)))
    ),
    decode: SchemaGetter.transformEffect((value, options) =>
      decodeDocumentXml(value).pipe(
        // The legacy decoders emit loose values (e.g. `descriptionCode: string`); the union member below validates and narrows them.
        Effect.map(document => document as PeppolDocumentObject),
        Effect.mapError(error => toInvalidValue(error, value, options))
      )
    ),
  })
);

export type PeppolDocumentEncoded = Schema.Codec.Encoded<typeof peppolDocumentSchema>;
export interface PeppolDocumentDecoded extends AllUnionFields<Schema.Schema.Type<typeof peppolDocumentSchema>> {}

/**
 * @description This defines the types of documents that are sent/received through the peppol network.
 */
export interface PeppolDocument extends AllUnionFields<PeppolInvoice | PeppolCreditNote> {}
/**
 * @description This defines the types of message that are sent/received through the peppol network.
 */
export interface PeppolMessage extends AllUnionFields<typeof peppolMessageLevelResponseSchema.Type | typeof peppolInvoiceResponseSchema.Type> {}
export interface PeppolAllDocuments extends AllUnionFields<PeppolDocument | PeppolMessage> {}
export interface PeppolDocumentLine extends AllUnionFields<PeppolInvoiceLine | PeppolCreditNoteLine> {}
