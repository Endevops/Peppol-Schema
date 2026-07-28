import * as z from 'zod/mini';

import { amountSchema } from '#/schemas/fields/amount-schema';

/**
 * @description A group of business terms providing the monetary totals for the Invoice.
 *
 * @summary Document totals
 *
 * @name cac:LegalMonetaryTotal
 */
export const legalMonetaryTotalSchema = z.object({
  /**
   * @description Sum of all allowances on document level in the Invoice.
   *
   * @remarks
   *   Must be rounded to maxium 2 decimals.
   *
   * @example
   *   200.0;
   *
   * @summary Sum of allowances on document level
   *
   * @name `cbc:AllowanceTotalAmount (+ @currencyID)`
   */
  allowanceTotalAmount: z.optional(amountSchema),
  /**
   * @description Sum of all charges on document level in the Invoice.
   *
   * @remarks
   *   Must be rounded to maximum 2 decimals.
   *
   * @example
   *   0.0;
   *
   * @summary Sum of charges on document level
   *
   * @name `cbc:ChargeTotalAmount (+ @currencyID)`
   */
  chargeTotalAmount: z.optional(amountSchema),
  /**
   * @description Sum of all Invoice line net amounts in the Invoice.
   *
   * @remarks
   *   Must be rounded to maximum 2 decimals.
   *
   * @example
   *   3800.0;
   *
   * @summary Sum of Invoice line amount
   *
   * @name `cbc:LineExtensionAmount (+ @currencyID)`
   */
  lineExtensionAmount: amountSchema,
  /**
   * @description The amount due for payment on the Invoice, after accounting for all allowances, charges, prepayments, and rounding adjustments.
   *
   * @remarks
   *   Must be rounded to maximum 2 decimals.
   *
   * @example
   *   4500.0;
   *
   * @summary Amount due for payment
   *
   * @name `cbc:PayableAmount (+ @currencyID)`
   */
  payableAmount: amountSchema,
  /**
   * @description The rounding amount applied to the Invoice total.
   *
   * @remarks
   *   Must be rounded to maximum 2 decimals.
   *
   * @example
   *   0.0;
   *
   * @summary Rounding amount
   *
   * @name `cbc:PayableRoundingAmount (+ @currencyID)`
   */
  payableRoundingAmount: z.optional(amountSchema),
  /**
   * @description The sum of amounts which have been paid in advances.
   *
   * @remarks
   *   Must be rounded to maximum 2 decimals.
   *
   * @example
   *   0.0;
   *
   * @summary Paid amount
   *
   * @name `cbc:PrepaidAmount (+ @currencyID)`
   */
  prepaidAmount: z.optional(amountSchema),
  /**
   * @description The total amount of the Invoice without VAT.
   *
   * @remarks
   *   Must be rounded to maximum 2 decimals.
   *
   * @example
   *   3600.0;
   *
   * @summary Invoice total amount without VAT
   *
   * @name `cbc:TaxExclusiveAmount (+ @currencyID)`
   */
  taxExclusiveAmount: amountSchema,
  /**
   * @description The total amount of the Invoice with VAT.
   *
   * @example
   *   4500.0;
   *
   * @summary Invoice total amount with VAT
   *
   * @remark Must be rounded to maximum 2 decimals.
   *
   * @name `cbc:TaxInclusiveAmount (+ @currencyID)`
   */
  taxInclusiveAmount: amountSchema,
});
export type PeppolLegalMonetaryTotal = z.infer<typeof legalMonetaryTotalSchema>;
