import * as z from 'zod/mini';
import { binaryObjectSchema } from '#/schemas/fields/binary-object-schema';
import { identifierSchema } from '#/schemas/fields/identifier-schema';
import { additionalDocumentReferenceCodeSchema } from '#/schemas/values/additional-doucment-reference-code';

/**
 * @description A group of business terms providing information about additional supporting documents substantiating the claims made in the Invoice. The additional
 * supporting documents can be used for both referencing a document number which is expected to be known by the receiver, an external document
 * (referenced by a URL) or as an embedded document, Base64 encoded (such as a time report).
 *
 * @summary ADDITIONAL SUPPORTING DOCUMENTS
 *
 * @name `cac:AdditionalDocumentReference`
 */
export const additionalDocumentReferenceSchema = z.extend(identifierSchema(), {
  /**
   * @description An identifier for an object on which the invoice is based (with DocumentTypeCode=130), given by the Seller, the identifier for the supporting
   * document or the project reference identifier (DocumentTypeCode=50).
   *
   * @summary Invoiced object identifier, Supporting document reference or project reference
   *
   * @name `cbc:ID`
   */
  id: z.object({
    /**
     * @description An identifier for an object on which the invoice is based (with DocumentTypeCode=130), given by the Seller, the identifier for the supporting
     * document or the project reference identifier (DocumentTypeCode=50).
     *
     * @summary Invoiced object identifier, Supporting document reference or project reference
     *
     * @name `#text`
     */
    id: z.string(),
    /**
     * @description The identification scheme identifier of the Invoiced object identifier.
     *
     * @summary Scheme identifier
     *
     * @name `@schemeID`
     */
    schemeId: z.optional(additionalDocumentReferenceCodeSchema()),
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
  documentTypeCode: z.optional(z.string()),
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
  documentDescription: z.optional(z.string()),
  /**
   * @summary Attachment
   *
   * @name `cac:Attachment`
   */
  attachment: z.optional(
    z.object({
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
      embeddedDocumentBinaryObject: z.optional(binaryObjectSchema),
      /**
       * @summary EXTERNAL REFERENCE
       *
       * @name `cac:ExternalReference`
       */
      externalReference: z.optional(
        z.object({
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
          uri: z.string(),
        })
      ),
    })
  ),
});

export type PeppolAdditionalDocumentReference = z.infer<typeof additionalDocumentReferenceSchema>;
