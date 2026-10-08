import { Effect, Schema } from 'effect';

import { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema.ts';
import { CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A line document reference: the identifier of the object the line is based on, with an optional identification scheme, and the type code that says
 * what kind of object it is. Wraps the `cac:DocumentReference` element of an invoice or credit note line.
 *
 * @example
 *   ```ts
 *   { id: { id: '123' }, documentTypeCode: '130' }
 *   ```;
 *
 * @summary LINE OBJECT IDENTIFIER
 *
 * @name `cac:DocumentReference`
 */
export class PeppolLineDocumentReference extends opaque<PeppolLineDocumentReference>()(
  Schema.Struct({
    /**
     * @description The identifier of the object on which the line is based, paired with an optional identification scheme identifier.
     *
     * @summary Line object identifier
     *
     * @name `cbc:ID`
     */
    id: PeppolIdentifier.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' })),
    /**
     * @remarks
     *   Code "130" MUST be used to indicate an invoice object reference and code "50" for project reference.
     *
     * @default 130
     *
     * @summary Document type code
     *
     * @name `cbc:DocumentTypeCode`
     */
    documentTypeCode: Schema.String.pipe(
      Schema.withDecodingDefaultType(Effect.succeed('130')),
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'DocumentTypeCode' })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}
