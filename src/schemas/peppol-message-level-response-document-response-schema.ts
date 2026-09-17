import { Schema } from 'effect';

import { PeppolDocumentResponseDocumentReference } from '#/schemas/peppol-document-response-document-reference-schema.ts';
import { PeppolDocumentResponseDocument } from '#/schemas/peppol-document-response-document-schema.ts';
import { PeppolDocumentResponseLineResponse } from '#/schemas/peppol-document-response-line-response-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description Wraps `cac:DocumentResponse` inside a message level response: the response, the document reference and any per-line responses.
 *
 * @example
 *   ```ts
 *   { response: { responseCode: 'RE' }, documentReference: { id: 'EnvelopeID-12345' }, lineResponse: [] }
 *   ```;
 *
 * @see {@link PeppolMessageLevelResponse}
 */
export class PeppolMessageLevelResponseDocumentResponse extends opaque<PeppolMessageLevelResponseDocumentResponse>()(
  Schema.Struct({
    /**
     * @summary Response information
     *
     * @name `cac:Response`
     *
     * @cardinality (1..1)
     */
    response: PeppolDocumentResponseDocument,
    /**
     * @description The document reference is used to provide a reference to the envelope of the business document on which the message level response is based.
     * The message level response message may only cover exactly one business document. The element
     * `cac:DocumentResponse/cac:DocumentReference/cbc:ID` **MUST** contain the instance identifier of the envelope of the original business
     * document.
     *
     * @summary Document reference
     */
    documentReference: PeppolDocumentResponseDocumentReference,
    /**
     * @description A response to a particular line in the document. If the document response is negative (code='RE'), the line response element is used to specify
     * the errors in the business document.
     *
     * @summary Line response information
     */
    lineResponse: Schema.Array(PeppolDocumentResponseLineResponse),
  })
) {}
