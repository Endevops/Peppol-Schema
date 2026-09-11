import type { AllUnionFields } from 'type-fest';

import { Effect, Equal, Predicate, Schema, SchemaGetter, SchemaIssue } from 'effect';
import XMLBuilder from 'fast-xml-builder';
import { XMLParser } from 'fast-xml-parser';

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
import { strOrUnd } from '#/helpers/str-or-und';
import { builderOptions } from '#/xml/builder-options';
import { parserOptions } from '#/xml/parser-options';

import { peppolCreditNoteSchema } from './credit-note';
import { peppolInvoiceSchema } from './invoice';
import { peppolInvoiceResponseSchema } from './invoice-response-schema';
import { peppolMessageLevelResponseSchema } from './message-level-response-schema';

export class PeppolInvalidDocumentType extends Schema.TaggedError<PeppolInvalidDocumentType>()('PeppolInvalidDocumentType', {
  message: Schema.String,
  rootNodes: Schema.Array(Schema.String),
}) {}
/**
 * @description Union of every supported PEPPOL business document (Effect port of the `z.xor` side of `documentParser`). Members discriminate cleanly: invoice vs
 * credit note via `invoiceLines`/`creditNoteLines`, message-level vs invoice response via the `profileId` literal.
 */
export const PeppolDocumentSchema = Schema.Union([
  peppolInvoiceSchema,
  peppolCreditNoteSchema,
  peppolMessageLevelResponseSchema,
  peppolInvoiceResponseSchema,
]).pipe(
  Schema.encodeTo(Schema.String, {
    encode: SchemaGetter.transformOrFail(
      Effect.fn(function* (document) {
        let content: unknown;
        if (Predicate.hasProperty(document, 'invoiceLines')) {
          content = encodeInvoice(document as unknown as ZodPeppolInvoice);
        } else if (Predicate.hasProperty(document, 'creditNoteLines')) {
          content = encodeCreditNote(document as unknown as ZodPeppolCreditNote);
        } else if (Predicate.hasProperty(document, 'documentResponse')) {
          if (Equal.equals(document.profileId, MESSAGE_LEVEL_RESPONSE_PROFILE_ID)) {
            content = encodeMessageLevelResponse(document as unknown as ZodPeppolMessageLevelResponse);
          } else if (Equal.equals(document.profileId, INVOICE_RESPONSE_PROFILE_ID)) {
            content = encodeInvoiceResponse(document as unknown as ZodPeppolInvoiceResponse);
          }
        }

        const builder = new XMLBuilder(builderOptions);
        return builder.build(content);
      })
    ),
    decode: SchemaGetter.transformOrFail(
      Effect.fn(function* (value, options) {
        const parser = new XMLParser({ ...parserOptions, removeNSPrefix: true });
        const parsed: XmlNode = parser.parse(value);

        if (Predicate.isNotNullish(parsed.Invoice)) {
          return decodeInvoice(parsed) as typeof peppolInvoiceSchema.Type;
        } else if (Predicate.isNotNullish(parsed.CreditNote)) {
          return decodeCreditNote(parsed) as typeof peppolCreditNoteSchema.Type;
        } else if (Predicate.isNotNullish(parsed.ApplicationResponse)) {
          const profile = strOrUnd(parsed.ApplicationResponse, 'cbc:ProfileID');
          if (Equal.equals(profile, MESSAGE_LEVEL_RESPONSE_PROFILE_ID)) {
            return decodeMessageLevelResponse(parsed) as typeof peppolMessageLevelResponseSchema.Type;
          } else if (Equal.equals(profile, INVOICE_RESPONSE_PROFILE_ID)) {
            return decodeInvoiceResponse(parsed) as typeof peppolInvoiceResponseSchema.Type;
          }
        }

        return yield* Effect.fail(
          new SchemaIssue.InvalidValue({ message: `Unsupported document type: ${Object.keys(parsed).join(',')}` }, value, options)
        );
      })
    ),
  })
);

/**
 * @description This defines the types of documents that are sent/received through the peppol network.
 */
export type PeppolDocument = AllUnionFields<typeof peppolInvoiceSchema.Type | typeof peppolCreditNoteSchema.Type>;
/**
 * @description This defines the types of message that are sent/received through the peppol network.
 */
export type PeppolMessage = AllUnionFields<typeof peppolMessageLevelResponseSchema.Type | typeof peppolInvoiceResponseSchema.Type>;
export type PeppolAllDocuments = AllUnionFields<PeppolDocument | PeppolMessage>;
export type PeppolDocumentLine = AllUnionFields<
  typeof peppolInvoiceSchema.fields.invoiceLines.Type | typeof peppolCreditNoteSchema.fields.creditNoteLines.Type
>;
