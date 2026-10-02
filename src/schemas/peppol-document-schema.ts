import { toCodecXml } from '@endevops/effect-codec-xml';
import { Schema } from 'effect';

import type { PeppolCreditNoteLine } from '#/schemas/fields/peppol-credit-note-line-schema.ts';
import type { PeppolInvoiceLine } from '#/schemas/fields/peppol-invoice-line-schema.ts';

import { PeppolCreditNote } from '#/schemas/peppol-credit-note-schema.ts';
import { PeppolInvoiceResponse } from '#/schemas/peppol-invoice-response-schema.ts';
import { PeppolInvoice } from '#/schemas/peppol-invoice-schema.ts';
import { PeppolMessageLevelResponse } from '#/schemas/peppol-message-level-response-schema.ts';

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
export const PeppolDocumentSchema = Schema.Union(
  [
    PeppolInvoice.pipe(toCodecXml),
    PeppolCreditNote.pipe(toCodecXml),
    PeppolMessageLevelResponse.pipe(toCodecXml),
    PeppolInvoiceResponse.pipe(toCodecXml),
  ],
  { mode: 'oneOf' }
);

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
