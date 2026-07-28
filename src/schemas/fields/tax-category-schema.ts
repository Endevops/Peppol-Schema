import * as z from 'zod/mini';

import { dutyTaxFeeCategorySchema } from '#/schemas/values/duty-tax-fee-cateogries';

/**
 * @description A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.
 *
 * @summary LINE VAT INFORMATION
 *
 * @name `cac:TaxCategory`
 */
export const taxCategorySchema = z.object({
  /**
   * @description The VAT category code for the invoiced item.
   *
   * @summary Invoiced item VAT category code
   *
   * @name `cbc:ID`
   */ id: dutyTaxFeeCategorySchema(),
  /**
   * @description The VAT rate, represented as percentage that applies to the invoiced item.
   *
   * @summary Invoiced item VAT rate
   *
   * @name `cbc:Percent`
   */
  percent: z.optional(z.number()),
  /**
   * @default VAT
   *
   * @name `cac:TaxScheme`
   */
  taxSchemeId: z.object({
    /**
     * @name `cbc:ID`
     */
    id: z._default(z.string(), 'VAT'),
  }),
});

export type PeppolTaxCategory = z.infer<typeof taxCategorySchema>;
