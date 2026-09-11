import { Schema } from 'effect';

import { peppolDocumentTypeCodeSchema } from './values/document-type-codes';

export const peppolDocumentResponseDocumentReferenceSchema = Schema.Struct({
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
  id: Schema.String,
  /**
   * @description The type of the document being referred to, expressed as a code.
   *
   * @summary Document type code
   *
   * @name `cbc:DocumentTypeCode`
   */
  documentTypeCode: Schema.optional(peppolDocumentTypeCodeSchema()),
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
  versionId: Schema.optional(Schema.String),
});

export type PeppolMessageLevelDocumentResponseDocumentReference = typeof peppolDocumentResponseDocumentReferenceSchema.Type;
