import * as z from 'zod/mini';

import { documentResponseDocumentReferenceSchema } from '#/schemas/document-response-document-reference-schema';
import { documentResponseDocumentSchema } from '#/schemas/document-response-document-schema';
import { documentResponseLineResponseSchema } from '#/schemas/document-response-line-response-schema';

export const messageLevelResponseDocumentResponseSchema = z.object({
  /**
   * @summary Response information
   *
   * @name `cac:Response`
   *
   * @cardinality (1..1)
   */
  response: documentResponseDocumentSchema,
  /**
   * @description The document reference is used to provide a reference to the envelope of the business document on which the message level response is based. The
   * message level response message may only cover exactly one business document. The element `cac:DocumentResponse/cac:DocumentReference/cbc:ID`
   * **MUST** contain the instance identifier of the envelope of the original business document.
   *
   * @summary Document reference
   */
  documentReference: documentResponseDocumentReferenceSchema,
  /**
   * @description A response to a particular line in the document. If the document response is negative (code='RE'), the line response element is used to specify
   * the errors in the business document.
   *
   * @summary Line response information
   */
  lineResponse: z.array(documentResponseLineResponseSchema),
});

export type PeppolMessageLevelMessageLevelResponseDocumentResponse = z.infer<typeof messageLevelResponseDocumentResponseSchema>;
