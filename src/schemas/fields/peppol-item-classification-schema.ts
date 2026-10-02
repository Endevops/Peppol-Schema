import { Schema } from 'effect';

import { CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolItemClassificationCode } from '#/schemas/values/item-classification-codes-schema.ts';

/**
 * @description A code for classifying the item by its type or nature.
 *
 * @example
 *   `9873242`;
 *
 * @summary Item classification identifier
 *
 * @name `cbc:ItemClassificationCode`
 */
export class PeppolItemClassification extends opaque<PeppolItemClassification>()(
  Schema.Struct({
    /**
     * @description A code for classifying the item by its type or nature.
     *
     * @summary Item classification identifier
     *
     * @name `#text`
     */
    id: Schema.String.pipe(Schema.annotate({ xmlValue: true })),
    /**
     * @description The identification scheme identifier of the item classification identifier.
     *
     * @summary Item classification identifier identification scheme identifier
     *
     * @name `@listID`
     */
    listId: PeppolItemClassificationCode.pipe(
      Schema.annotate({
        xmlAttribute: true,
        xmlName: 'listID',
        description: 'The identification scheme identifier of the item classification identifier.',
        title: 'Item classification identifier identification scheme identifier',
      })
    ),
    /**
     * @description The identification scheme version identifier of the Item classification identifier.
     *
     * @remarks
     *   Only used with danish.
     *
     * @summary Item classification identifier version identification scheme identifier
     *
     * @name `@listVersionID`
     */
    listVersionId: Schema.optional(Schema.String).pipe(
      Schema.annotate({
        xmlAttribute: true,
        xmlName: 'listVersionID',
        description: 'The identification scheme version identifier of the Item classification identifier.',
        title: 'Item classification identifier version identification scheme identifier',
      })
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ItemClassificationCode' }), Schema.toStandardSchemaV1)
) {}
