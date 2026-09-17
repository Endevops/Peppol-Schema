import { Schema } from 'effect';

import { PeppolBinaryObject } from '#/schemas/fields/peppol-binary-object-schema.ts';
import { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolAdditionalDocumentReferenceCode } from '#/schemas/values/additional-document-reference-code-schema.ts';

/**
 * @description A reference to a supporting document that is stored outside the Invoice, identified by a URI. Wraps the `cac:ExternalReference` element of an
 * attachment group.
 *
 * @example
 *   ```ts
 *   { uri: 'http://www.example.com/index.html' }
 *   ```;
 *
 * @see {@link PeppolAttachment}
 */
export class PeppolAttachmentExternalReference extends opaque<PeppolAttachmentExternalReference>()(
  Schema.Struct({
    /**
     * @description The URL (Uniform Resource Locator) that identifies where the external document is located. A means of locating the resource, including its
     * primary access mechanism, e.g. http:// or ftp://.
     *
     * @example
     *   `http://www.example.com/index.html`;
     *
     * @summary External document location
     *
     * @name `cbc:URI`
     */
    uri: Schema.String,
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description The attachment of a supporting document to the Invoice, either embedded as a Base64 binary object or referenced by URI. Wraps the `cac:Attachment`
 * element of an additional supporting document.
 *
 * @example
 *   ```ts
 *   {
 *     embeddedDocumentBinaryObject: {
 *       content: 'aHR0cHM6Ly90ZXN0LXZlZmEuZGlmaS5uby9wZXBwb2xiaXM=',
 *       mimeCode: 'text/csv',
 *       filename: 'Hours - spent.csv'
 *     }
 *   }
 *   ```;
 *
 * @see {@link PeppolAdditionalDocumentReference}
 */
export class PeppolAttachment extends opaque<PeppolAttachment>()(
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
    embeddedDocumentBinaryObject: Schema.optional(PeppolBinaryObject),
    /**
     * @summary EXTERNAL REFERENCE
     *
     * @name `cac:ExternalReference`
     */
    externalReference: Schema.optional(PeppolAttachmentExternalReference),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description The identifier of an additional supporting document, an invoiced object reference or a project reference, together with an optional identification
 * scheme identifier.
 *
 * @example
 *   ```ts
 *   { id: '9873242' }
 *   ```;
 *
 * @see {@link PeppolAdditionalDocumentReference}
 */
export class PeppolId extends opaque<PeppolId>()(
  PeppolIdentifier.pipe(
    Schema.fieldsAssign({
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
      schemeId: Schema.optional(PeppolAdditionalDocumentReferenceCode),
    }),
    Schema.toStandardSchemaV1
  )
) {}

/**
 * @description A group of business terms providing information about additional supporting documents substantiating the claims made in the Invoice. The additional
 * supporting documents can be used for both referencing a document number which is expected to be known by the receiver, an external document
 * (referenced by a URL) or as an embedded document, Base64 encoded (such as a time report).
 *
 * @summary ADDITIONAL SUPPORTING DOCUMENTS
 *
 * @name `cac:AdditionalDocumentReference`
 */
export class PeppolAdditionalDocumentReference extends opaque<PeppolAdditionalDocumentReference>()(
  PeppolIdentifier.pipe(
    Schema.fieldsAssign({
      /**
       * @description An identifier for an object on which the invoice is based (with DocumentTypeCode=130), given by the Seller, the identifier for the supporting
       * document or the project reference identifier (DocumentTypeCode=50).
       *
       * @summary Invoiced object identifier, Supporting document reference or project reference
       *
       * @name `cbc:ID`
       */
      id: PeppolId,
      /**
       * @remarks
       *   Code "130" MUST be used to indicate an invoice object reference and code "50" for project reference. Element is not used for other
       *   additional documents.
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
      attachment: Schema.optional(PeppolAttachment),
    }),
    Schema.toStandardSchemaV1
  )
) {}
