import { Schema } from 'effect';

/**
 * @summary PAYMENT TERMS
 *
 * @name cac:PaymentTerms
 */
export const paymentTermsSchema = Schema.Struct({
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
  note: Schema.String,
});

export type PeppolPaymentTerms = typeof paymentTermsSchema.Type;
