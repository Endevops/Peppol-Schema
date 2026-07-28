import * as z from 'zod/mini';
import { itemClassificationCodesSchema } from '#/schemas/values/item-classification-code-schema';

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
export const itemClassificationSchema = z.object({
  /**
   * @description A code for classifying the item by its type or nature.
   *
   * @summary Item classification identifier
   *
   * @name `#text`
   */
  id: z.string(),
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
  listVersionId: z.optional(z.string()),
});
