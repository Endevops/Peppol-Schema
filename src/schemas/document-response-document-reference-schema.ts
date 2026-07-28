import * as z from 'zod/mini';

import { documentTypeCodeSchema } from '#/schemas/values/document-type-codes';

export const documentResponseDocumentReferenceSchema = z.object({
  /**
   * @description Identifies the document on which the message level response is based.
   *
   * @example
   *   `EnvelopeID-12345`;
   *
   * @summary Document identifier
   *
   * @name `cbc:ID`
   */
  id: z.string(),
  /**
   * @description The type of the document being referred to, expressed as a code.
   *
   * @summary Document type code
   *
   * @name `cbc:DocumentTypeCode`
   */
  documentTypeCode: z.optional(documentTypeCodeSchema()),
  /**
   * @description The version of the document that has been identifier with the document identifier.
   *
   * @example
   *   `2`;
   *
   * @summary Document version identifier
   *
   * @name `cbc:VersionID`
   */
  versionId: z.optional(z.string()),
});
export type PeppolMessageLevelDocumentResponseDocumentReference = z.infer<typeof documentResponseDocumentReferenceSchema>;
