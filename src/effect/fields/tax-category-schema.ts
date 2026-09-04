import { Effect, Schema } from 'effect';

import { dutyTaxFeeCategorySchema } from '#/effect/values/duty-tax-fee-cateogries';

/**
 * @description A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.
 *
 * @summary LINE VAT INFORMATION
 *
 * @name `cac:TaxCategory`
 */
export const taxCategorySchema = Schema.Struct({
  /**
   * @description The VAT category code for the invoiced item.
   *
   * @summary Invoiced item VAT category code
   *
   * @name `cbc:ID`
   */
  id: dutyTaxFeeCategorySchema(),
  /**
   * @description The VAT rate, represented as percentage that applies to the invoiced item.
   *
   * @summary Invoiced item VAT rate
   *
   * @name `cbc:Percent`
   */
  percent: Schema.optional(Schema.Number),
  /**
   * @default VAT
   *
   * @name `cac:TaxScheme`
   */
  taxSchemeId: Schema.Struct({
    /**
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed('VAT'))),
  }),
});

export type PeppolTaxCategory = typeof taxCategorySchema.Type;
