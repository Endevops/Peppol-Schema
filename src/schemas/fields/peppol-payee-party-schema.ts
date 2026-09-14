import { Schema } from 'effect';

import { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema';
import { opaque } from '#/schemas/utils/opaque';
import { icdCodesSchema } from '#/schemas/values/icd-codes-schema';

class PeppolPartyName extends opaque<PeppolPartyName>()(Schema.Struct({ name: Schema.String })) {}

class PeppolPartyLegalEntity extends opaque<PeppolPartyLegalEntity>()(
  Schema.Struct({
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
    companyId: Schema.optional(
      PeppolIdentifier.pipe(
        Schema.fieldsAssign({
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
          id: Schema.String,
          /**
           * @description The identification scheme identifier of the Payee legal registration identifier.
           *
           * @summary Payee legal registration identifier identification scheme identifier
           *
           * @name `@schemeID`
           */
          schemeId: Schema.optional(icdCodesSchema),
        })
      )
    ),
  })
) {}

class PeppolPartyIdentification extends opaque<PeppolPartyIdentification>()(
  Schema.Struct({
    /**
     * @description This element is used for both the identification of the Payee, or the unique banking reference identifier of Payee (assigned by the Payee
     * bank.) For payee identification use ICD code list, for SEPA bank assigned creditor reference, use SEPA.
     *
     * @summary Payee identifier or bank assigned crditor identifier
     *
     * @name `cbc:ID`
     */
    id: Schema.optional(
      PeppolIdentifier.pipe(
        Schema.fieldsAssign({
          /**
           * @description This element is used for both the identification of the Payee, or the unique banking reference identifier of Payee (assigned by the Payee
           * bank.) For payee identification use ICD code list, for SEPA bank assigned creditor reference, use SEPA.
           *
           * @summary Payee identifier or bank assigned crditor identifier
           *
           * @name `#text`
           */
          id: Schema.String,
          /**
           * @description The identification scheme identifier of the payee identifier. For bank assigned creditor identifier (BT-90), value MUST be "SEPA"
           *
           * @summary Payee or bank assigned creditor identifier identification scheme identifier
           *
           * @name `@schemeID`
           */
          schemeId: Schema.optional(Schema.String),
        })
      )
    ),
  })
) {}

/**
 * @description A group of business terms providing information about the Payee, i.e. the role that received the payment. Shall be used wwhen the payee is
 * different from the seller.
 *
 * @summary PAYEE
 *
 * @name cac:PayeeParty
 */
export class PeppolPayeeParty extends opaque<PeppolPayeeParty>()(
  Schema.Struct({
    /**
     * @summary PARTY IDENTIFICATION
     *
     * @name `cac:PartyIdentification`
     */
    partyIdentification: Schema.optional(PeppolPartyIdentification),
    /**
     * @summary PARTY LEGAL ENTITY
     *
     * @name `cac:PartyLegalEntity`
     */
    partyLegalEntity: Schema.optional(PeppolPartyLegalEntity),
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
    partyName: PeppolPartyName,
  })
) {}
