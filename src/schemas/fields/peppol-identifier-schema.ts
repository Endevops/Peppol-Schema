import { Schema } from 'effect';

import { CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A generic identifier paired with an optional identification scheme identifier. Wraps a `cbc:ID` element and its optional `@schemeID` attribute, and
 * is reused across document references.
 *
 * @example
 *   ```ts
 *   { id: '99887766', schemeId: '0088' }
 *   ```;
 *
 * @summary Identifier with optional scheme
 *
 * @name `cbc:ID (+ optional @schemeID)`
 */
export class PeppolIdentifier extends opaque<PeppolIdentifier>()(
  Schema.Struct({
    /**
     * @name cbc:ID
     */
    id: Schema.String.pipe(Schema.annotate({ xmlValue: true })),
    /**
     * @name `@schemeID`
     */
    schemeId: Schema.String.pipe(Schema.annotate({ xmlName: 'schemeID', xmlAttribute: true }), Schema.optional),
  }).pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ID' }), Schema.toStandardSchemaV1)
) {}
