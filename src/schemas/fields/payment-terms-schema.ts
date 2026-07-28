import * as z from 'zod/mini';

/**
 * @summary PAYMENT TERMS
 *
 * @name cac:PaymentTerms
 */
export const paymentTermsSchema = z.object({
  /**
   * @description A textual description of the payment terms that apply to the amount due for payment (Including description of possible penalties). In case the
   * Amount due for payment (BT-115) is positive, either the Payment due date (BT-9) or the Payment terms (BT-20) shall be present.
   *
   * @example
   *   Net within 30 days
   *
   * @summary Payment terms
   *
   * @name cbc:Note
   */
  note: z.string(),
});

export type PeppolPaymentTerms = z.infer<typeof paymentTermsSchema>;
