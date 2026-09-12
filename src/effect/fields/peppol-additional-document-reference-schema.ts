import { Schema } from 'effect';

import { peppolBinaryObjectSchema } from '#/effect/fields/peppol-binary-object-schema';
import { peppolIdentifierSchema } from '#/effect/fields/peppol-identifier-schema';
import { additionalDocumentReferenceCodeSchema } from '#/effect/values/additional-document-reference-code-schema';

/**
 * @description A group of business terms providing information about additional supporting documents substantiating the claims made in the Invoice. The additional
 * supporting documents can be used for both referencing a document number which is expected to be known by the receiver, an external document
 * (referenced by a URL) or as an embedded document, Base64 encoded (such as a time report).
 *
 * @summary ADDITIONAL SUPPORTING DOCUMENTS
 *
 * @name `cac:AdditionalDocumentReference`
 */
export const peppolAdditionalDocumentReferenceSchema = peppolIdentifierSchema().pipe(
  Schema.fieldsAssign({
    /**
     * @description An identifier for an object on which the invoice is based (with DocumentTypeCode=130), given by the Seller, the identifier for the supporting
     * document or the project reference identifier (DocumentTypeCode=50).
     *
     * @summary Invoiced object identifier, Supporting document reference or project reference
     *
     * @name `cbc:ID`
     */
    id: Schema.Struct({
      /**
       * @description An identifier for an object on which the invoice is based (with DocumentTypeCode=130), given by the Seller, the identifier for the supporting
       * document or the project reference identifier (DocumentTypeCode=50).
       *
       * @summary Invoiced object identifier, Supporting document reference or project reference
       *
       * @name `#text`
       */
      id: Schema.String,
      /**
       * @description The identification scheme identifier of the Invoiced object identifier.
       *
       * @summary Scheme identifier
       *
       * @name `@schemeID`
       */
      schemeId: Schema.optional(additionalDocumentReferenceCodeSchema()),
    }),
    /**
     * @remarks
     *   Code "130" MUST be used to indicate an invoice object reference and code "50" for project reference. Element is not used for other additional
     *   documents.
     *
     * @default 130
     *
     * @summary Document type code
     *
     * @name `cbc:DocumentTypeCode`
     */
    documentTypeCode: Schema.optional(Schema.String),
    /**
     * @description A description of the supporting document, such as timesheet, usage report, etc.
     *
     * @example
     *   Time list
     *
     * @summary Supporting document description
     *
     * @name `cbc:DocumentDescription`
     */
    documentDescription: Schema.optional(Schema.String),
    /**
     * @summary Attachment
     *
     * @name `cac:Attachment`
     */
    attachment: Schema.optional(
      Schema.Struct({
        /**
         * @description An attached document embedded as binary object (Base64) or sent together with the invoice.
         *
         * @example
         *   ```base64
         *   aHR0cHM6Ly90ZXN0LXZlZmEuZGlmaS5uby9wZXBwb2xiaXMvcG9hY2MvYmlsbGluZy8zLjAvYmlzLw==
         *   ```;
         *
         * @summary Attached document
         *
         * @name `cbc:EmbeddedDocumentBinaryObject`
         */
        embeddedDocumentBinaryObject: Schema.optional(peppolBinaryObjectSchema),
        /**
         * @summary EXTERNAL REFERENCE
         *
         * @name `cac:ExternalReference`
         */
        externalReference: Schema.optional(
          Schema.Struct({
            /**
             * @description The URL (Uniform Resource Locator) that identifies where the external document is located. A means of locating the resource, including
             * its primary access mechanism, e.g. http:// or ftp://.
             *
             * @example
             *   `http://www.example.com/index.html`;
             *
             * @summary External document location
             *
             * @name `cbc:URI`
             */
            uri: Schema.String,
          })
        ),
      })
    ),
  })
);

export type PeppolAdditionalDocumentReference = typeof peppolAdditionalDocumentReferenceSchema.Type;
