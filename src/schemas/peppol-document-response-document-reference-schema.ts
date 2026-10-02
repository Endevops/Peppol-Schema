import { Schema } from 'effect';

import { CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolDocumentTypeCode } from '#/schemas/values/peppol-document-type-code-schema.ts';

/**
 * @description Wraps `cac:DocumentReference` inside a message level response: identifies the business document the response is based on.
 *
 * @example
 *   ```ts
 *   { id: 'EnvelopeID-12345', versionId: '2' }
 *   ```;
 *
 * @see {@link PeppolMessageLevelResponseDocumentResponse}
 */
export class PeppolDocumentResponseDocumentReference extends opaque<PeppolDocumentResponseDocumentReference>()(
  Schema.Struct({
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
    id: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
    /**
     * @description The type of the document being referred to, expressed as a code.
     *
     * @summary Document type code
     *
     * @name `cbc:DocumentTypeCode`
     */
    documentTypeCode: PeppolDocumentTypeCode.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'DocumentTypeCode' }),
      Schema.optional
    ),
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
    versionId: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'VersionID' }), Schema.optional),
  }).pipe(Schema.toStandardSchemaV1)
) {}
