import { Schema } from 'effect';

import { peppolDocumentResponseDocumentReferenceSchema } from './peppol-document-response-document-reference-schema';
import { peppolDocumentResponseDocumentSchema } from './peppol-document-response-document-schema';
import { peppolDocumentResponseLineResponseSchema } from './peppol-document-response-line-response-schema';

export const peppolMessageLevelResponseDocumentResponseSchema = Schema.Struct({
  /**
   * @summary Response information
   *
   * @name `cac:Response`
   *
   * @cardinality (1..1)
   */
  response: peppolDocumentResponseDocumentSchema,
  /**
   * @description The document reference is used to provide a reference to the envelope of the business document on which the message level response is based. The
   * message level response message may only cover exactly one business document. The element `cac:DocumentResponse/cac:DocumentReference/cbc:ID`
   * **MUST** contain the instance identifier of the envelope of the original business document.
   *
   * @summary Document reference
   */
  documentReference: peppolDocumentResponseDocumentReferenceSchema,
  /**
   * @description A response to a particular line in the document. If the document response is negative (code='RE'), the line response element is used to specify
   * the errors in the business document.
   *
   * @summary Line response information
   */
  lineResponse: Schema.Array(peppolDocumentResponseLineResponseSchema),
});

export type PeppolMessageLevelMessageLevelResponseDocumentResponse = typeof peppolMessageLevelResponseDocumentResponseSchema.Type;
