import { Schema } from 'effect';

import { PeppolDocumentResponseLineResponseContent } from '#/schemas/peppol-document-response-line-response-content-schema.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description Wraps `cac:LineReference` inside a line response: an XPath pointing at the element that caused the reported issue.
 *
 * @example
 *   ```ts
 *   { lineId: '/Invoice/cac:InvoiceLine[1]' }
 *   ```;
 *
 * @see {@link PeppolDocumentResponseLineResponse}
 */
export class PeppolLineReference extends opaque<PeppolLineReference>()(
  Schema.Struct({
    /**
     * @description Identifies the section of the document to which the reported issue applied. The LineID element mustbe used to indicate where in the business
     * document the error occurred by using XPath to reference the element causing the error. To cater for scenarios where it is not possible to
     * provide XPath, a dummy value must be applied. The dummay value must consist of the characters NA. This is due to that the LineID element is
     * mendatory in the ApplicationResponse message in UBL 2.1 on which the MLR message is based.
     *
     * @example
     *   `/Catalogue/cac:CatalogueLine[3]/cac:Item[1]/cac:ClassifiedTaxCategory[1]/cbc:ID[1]`;
     *
     * @summary Section identifier
     */
    lineId: Schema.String,
  })
) {}

/**
 * @description Wraps `cac:LineResponse` inside a message level response: pairs a line reference with the response for that line.
 *
 * @example
 *   ```ts
 *   {
 *     lineReference: { lineId: '/Invoice/cac:InvoiceLine[1]' },
 *     response: { responseCode: 'RE', description: 'Invalid tax category', status: { statusReasonCode: 'SV' } }
 *   }
 *   ```;
 *
 * @see {@link PeppolMessageLevelResponseDocumentResponse}
 */
export class PeppolDocumentResponseLineResponse extends opaque<PeppolDocumentResponseLineResponse>()(
  Schema.Struct({
    /**
     * @description Identifies the line in the business document to which the reported issue applies.
     *
     * @summary Line reference
     *
     * @name `cac:LineReference`
     */
    lineReference: PeppolLineReference,
    /**
     * @summary Line response information
     */
    response: PeppolDocumentResponseLineResponseContent,
  })
) {}
