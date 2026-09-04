import { Schema } from 'effect';

import { itemClassificationCodesSchema } from '#/effect/values/item-classification-code-schema';

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
export const itemClassificationSchema = Schema.Struct({
  /**
   * @description A code for classifying the item by its type or nature.
   *
   * @summary Item classification identifier
   *
   * @name `#text`
   */
  id: Schema.String,
  /**
   * @description The identification scheme identifier of the item classification identifier.
   *
   * @summary Item classification identifier identification scheme identifier
   *
   * @name `@listID`
   */
  listId: itemClassificationCodesSchema(),
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
  listVersionId: Schema.optionalKey(Schema.String),
});

export type PeppolItemClassification = typeof itemClassificationSchema.Type;
