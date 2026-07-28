import * as z from 'zod/mini';

import { paymentMeansCodeSchema } from '#/schemas/values/payment-means-codes-schema';

/**
 * @description A group of business terms providing information about the payment.
 *
 * @summary Payment means (credit transfer/direct debit/card)
 *
 * @name cac:PaymentMeans
 */
export const paymentMeansSchema = z.object({
  /**
   * @description The means, expressed as code, for how a payment is expected to be or has been settled.
   *
   * @example
   *   30;
   *
   * @summary Payment means type code
   *
   * @name `cbc:PaymentMeansCode`
   */
  paymentMeansCode: z.object({
    /**
     * @description The means, expressed as code, for how a payment is expected to be or has been settled.
     *
     * @example
     *   30;
     *
     * @summary Payment means type code
     *
     * @name `#text`
     */
    code: paymentMeansCodeSchema(),
    /**
     * @description The means, expressed as text, for how a payment is expected to be or has been settled.
     *
     * @example
     *   Credit transfer
     *
     * @summary Payment means text
     *
     * @name `@name`
     */
    name: z.optional(z.string()),
  }),
  /**
   * @description The date when the payment is due.Format "YYYY-MM-DD". In case the Amount due for payment (BT-115) is positive, either the Payment due date (BT-9)
   * or the Payment terms (BT-20) shall be present.
   *
   * @remarks
   *   This should only be used with a credit note.
   *
   * @summary Payment due date
   *
   * @name `cbc:PaymentDueDate`
   */
  paymentDueDate: z.optional(z.iso.date()),
  /**
   * @description A textual value used to establish a link between the payment and the Invoice, issued by the Seller. Used for creditor's critical reconciliation
   * information. This information element helps the Seller to assign an incoming payment to the relevant payment process.
   *
   * @example
   *   `432948234234234`;
   *
   * @summary Remittance information
   *
   * @name cbc:PaymentID
   */
  paymentId: z.optional(z.string()),
  /**
   * @description A group of business terms providing information about card used for payment contemporaneous with invoice issuance.
   *
   * @summary PAYMENT CARD INFORMATION
   *
   * @name cac:CardAccount
   */
  cardAccount: z.optional(
    z.object({
      /**
       * @description The name of the payment card holder.
       *
       * @summary Payment card holder name
       *
       * @name cbc:HolderName
       */
      holderName: z.optional(z.string()),
      /**
       * @summary Syntax required element not related to a business term.
       *
       * @name cbc:NetworkID
       */
      networkId: z.string(),
      /**
       * @description The Primary Account Number (PAN) of the card used for payment. In accordance with card payments security standards, an invoice should never
       * include a full card primary account number.
       *
       * @example
       *   `1234`;
       *
       * @summary Payment card primary account number
       *
       * @name cbc:PrimaryAccountNumberID
       */
      primaryAccountNumberId: z.string(),
    })
  ),
  /**
   * @description A group of business terms to specify credit transfer payments.
   *
   * @summary CREDIT TRANSFER
   *
   * @name cac:PayeeFinancialAccount
   */
  payeeFinancialAccount: z.optional(
    z.object({
      /**
       * @description An identifier for the payment service provider where a payment account is located. Such as a BIC or a national clearing code where required.
       * No identification scheme Identifier to be used.
       *
       * @example
       *   `9998`;
       *
       * @summary Payment service provider identifier
       *
       * @name `cac:FinancialInstitutionBranch`
       */
      financialInstitutionBranch: z.optional(
        z.object({
          /**
           * @description An identifier for the payment service provider where a payment account is located. Such as a BIC or a national clearing code where
           * required. No identification scheme Identifier to be used.
           *
           * @example
           *   `9998`;
           *
           * @summary Payment service provider identifier
           *
           * @name `cac:FinancialInstitutionBranch`
           */
          id: z.string(),
        })
      ),
      /**
       * @description A unique identifier of the financial payment account, at a payment service provider, to which payment should be made. Such as IBAN or BBAN.
       *
       * @summary Payment account identifier
       *
       * @name cbc:ID
       */
      id: z.string(),
      /**
       * @description The name of the payment account, at a payment service provider, to which payment should be made.
       *
       * @summary Payment account name
       *
       * @name cbc:Name
       */
      name: z.optional(z.string()),
    })
  ),
  /**
   * @description A group of business terms to specify a direct debit.
   *
   * @summary DIRECT DEBIT
   *
   * @name cac:PaymentMandate
   */
  paymentMandate: z.optional(
    z.object({
      /**
       * @description Unique identifier assigned by the Payee for referencing the direct debit mandate. Used in order to pre-notify the Buyer of a SEPA direct
       * debit.
       *
       * @summary Mandate reference identifier
       *
       * @name cbc:ID
       */
      id: z.optional(z.string()),
      /**
       * @description The account to be debited by the direct debit.
       *
       * @example
       *   `12345676543`;
       *
       * @summary Debited account identifier
       *
       * @name `cac:PayerFinancialAccount`
       */
      payerFinancialAccountId: z.optional(
        z.object({
          /**
           * @description The account to be debited by the direct debit.
           *
           * @example
           *   `12345676543`;
           *
           * @summary Debited account identifier
           *
           * @name `cbc:ID`
           */
          id: z.string(),
        })
      ),
    })
  ),
});

export type PeppolPaymentMeans = z.infer<typeof paymentMeansSchema>;
