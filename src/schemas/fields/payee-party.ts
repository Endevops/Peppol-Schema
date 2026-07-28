import * as z from 'zod/mini';
import { identifierSchema } from '#/schemas/fields/identifier-schema';
import { icdCodesSchema } from '#/schemas/values/icd-codes';

/**
 * @description A group of business terms providing information about the Payee, i.e. the role that received the payment. Shall be used wwhen the payee is
 * different from the seller.
 *
 * @summary PAYEE
 *
 * @name cac:PayeeParty
 */
export const payeePartySchema = z.object({
  /**
   * @summary PARTY IDENTIFICATION
   *
   * @name `cac:PartyIdentification`
   */
  partyIdentification: z.optional(
    z.object({
      /**
       * @description This element is used for both the identification of the Payee, or the unique banking reference identifier of Payee (assigned by the Payee
       * bank.) For payee identification use ICD code list, for SEPA bank assigned creditor reference, use SEPA.
       *
       * @summary Payee identifier or bank assigned crditor identifier
       *
       * @name `cbc:ID`
       */
      id: z.optional(
        z.extend(identifierSchema(), {
          /**
           * @description This element is used for both the identification of the Payee, or the unique banking reference identifier of Payee (assigned by the Payee
           * bank.) For payee identification use ICD code list, for SEPA bank assigned creditor reference, use SEPA.
           *
           * @summary Payee identifier or bank assigned crditor identifier
           *
           * @name `#text`
           */
          id: z.string(),
          /**
           * @description The identification scheme identifier of the payee identifier. For bank assigned creditor identifier (BT-90), value MUST be "SEPA"
           *
           * @summary Payee or bank assigned creditor identifier identification scheme identifier
           *
           * @name `@schemeID`
           */
          schemeId: z.optional(z.string()),
        })
      ),
    })
  ),
  /**
   * @summary PARTY LEGAL ENTITY
   *
   * @name `cac:PartyLegalEntity`
   */
  partyLegalEntity: z.optional(
    z.object({
      /**
       * @description An identifier issued by an official registrar that identifies the payee as a legal entity or person.
       *
       * @example
       *   `FR932874294`;
       *
       * @summary Payee legal registration identifier
       *
       * @name `cbc:CompanyID`
       */
      companyId: z.optional(
        z.safeExtend(identifierSchema(), {
          /**
           * @description An identifier issued by an official registrar that identifies the payee as a legal entity or person.
           *
           * @example
           *   `FR932874294`;
           *
           * @summary Payee legal registration identifier
           *
           * @name `#text`
           */
          id: z.string(),
          /**
           * @description The identification scheme identifier of the Payee legal registration identifier.
           *
           * @summary Payee legal registration identifier identification scheme identifier
           *
           * @name `@schemeID`
           */
          schemeId: z.optional(icdCodesSchema()),
        })
      ),
    })
  ),
  /**
   * @description The name of the payee.
   *
   * @example
   *   `Payee Name Ltd`;
   *
   * @summary Payee name
   *
   * @name `cac:PartyName`
   */
  partyName: z.object({ name: z.string() }),
});
export type PeppolPayeeParty = z.infer<typeof payeePartySchema>;
