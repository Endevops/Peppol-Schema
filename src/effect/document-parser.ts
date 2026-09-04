import { Effect, Schema } from 'effect';
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

import { creditNoteSchema } from './credit-note';
import { invoiceSchema } from './invoice';
import { invoiceResponseSchema } from './invoice-response-schema';
import { messageLevelResponse } from './message-level-response-schema';

/**
 * @description Union of every supported PEPPOL business document (Effect port of the `z.xor` side of `documentParser`). Members discriminate cleanly: invoice vs
 * credit note via `invoiceLines`/`creditNoteLines`, message-level vs invoice response via the `profileId` literal.
 */
export const PeppolDocumentSchema = Schema.Union([invoiceSchema, creditNoteSchema, messageLevelResponse, invoiceResponseSchema]);

export type PeppolDocument = typeof PeppolDocumentSchema.Type;

/**
 * @description Parse an XML string into raw decoded JSON, branching exactly like `documentParser.decode`. ISO dates stay plain strings (the shared `decode*`
 * helpers never build `Date` objects).
 *
 * @throws When the root element is not a supported document type.
 */
function parseXmlToRawDocument(xml: string): unknown {
  const parser = new XMLParser({ ...parserOptions, removeNSPrefix: true });
  const parsed: XmlNode = parser.parse(xml);
  if (parsed.Invoice) {
    return decodeInvoice(parsed);
  } else if (parsed.CreditNote) {
    return decodeCreditNote(parsed);
  } else if (parsed.ApplicationResponse) {
    const profile = strOrUnd(parsed.ApplicationResponse, 'cbc:ProfileID');
    if (profile === MESSAGE_LEVEL_RESPONSE_PROFILE_ID) {
      return decodeMessageLevelResponse(parsed);
    } else if (profile === INVOICE_RESPONSE_PROFILE_ID) {
      return decodeInvoiceResponse(parsed);
    }
  }
  throw new Error(`Unsupported document type: ${Object.keys(parsed).join(',')}`);
}

/**
 * @description Decode a PEPPOL XML string into a validated `PeppolDocument`. Throws on error.
 */
export function decodeDocumentSync(xml: string): PeppolDocument {
  return Schema.decodeUnknownSync(PeppolDocumentSchema)(parseXmlToRawDocument(xml));
}

/**
 * @description Encode a `PeppolDocument` back into a PEPPOL XML string. Throws on error.
 */
export function encodeDocumentSync(document: PeppolDocument): string {
  let content: unknown;
  if ('invoiceLines' in document) {
    content = encodeInvoice(document as unknown as ZodPeppolInvoice);
  } else if ('creditNoteLines' in document) {
    content = encodeCreditNote(document as unknown as ZodPeppolCreditNote);
  } else if ('documentResponse' in document) {
    if (document.profileId === MESSAGE_LEVEL_RESPONSE_PROFILE_ID) {
      content = encodeMessageLevelResponse(document as unknown as ZodPeppolMessageLevelResponse);
    } else if (document.profileId === INVOICE_RESPONSE_PROFILE_ID) {
      content = encodeInvoiceResponse(document as unknown as ZodPeppolInvoiceResponse);
    }
  }

  const builder = new XMLBuilder(builderOptions);
  return builder.build(content);
}

/**
 * @description Effect variant of {@link decodeDocumentSync}: parses and validates, capturing failures in the error channel.
 */
export function decodeDocumentEffect(xml: string): Effect.Effect<PeppolDocument, unknown> {
  return Effect.try(() => decodeDocumentSync(xml));
}

/**
 * @description Effect variant of {@link encodeDocumentSync}: serializes, capturing failures in the error channel.
 */
export function encodeDocumentEffect(document: PeppolDocument): Effect.Effect<string, unknown> {
  return Effect.try(() => encodeDocumentSync(document));
}

// Aliases matching the `decodeUnknownSync`/`encodeSync` + `decodeUnknownEffect`/`encodeEffect` naming.
export const decodeUnknownSync = decodeDocumentSync;
export const encodeSync = encodeDocumentSync;
export const decodeUnknownEffect = decodeDocumentEffect;
export const encodeEffect = encodeDocumentEffect;
