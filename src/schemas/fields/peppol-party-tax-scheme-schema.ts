import { Effect, Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';

export class PeppolPartyTaxSchemeId extends opaque<PeppolPartyTaxSchemeId>()(
  Schema.Struct({
    /**
     * @description Mandatory element. For Seller VAT identifier (BT-31), use value “VAT”, for the seller tax registration identifier (BT-32), use != "VAT"
     *
     * @name cbc:ID
     */
    id: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed('VAT'))),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description The Seller tax registration details, combining a tax identifier such as a VAT number with the tax scheme.
 *
 * @name cac:PartyTaxScheme (0..2)
 */
export class PeppolPartyTaxScheme extends opaque<PeppolPartyTaxScheme>()(
  Schema.Struct({
    /**
     * @description The Seller's VAT identifier (also known as Seller VAT identification number) or the local identification (defined by the Seller’s address) of
     * the Seller for tax purposes or a reference that enables the Seller to state his registered tax status. In order for the buyer to automatically
     * identify a supplier, the Seller identifier (BT-29), the Seller legal registration identifier (BT-30) and/or the Seller VAT identifier (BT-31)
     * shall be present.
     *
     * @summary Seller VAT identifier, Seller tax registration identifier
     *
     * @name `cbc:CompanyID`
     */
    companyId: Schema.String,
    /**
     * @description Mandatory element. For Seller VAT identifier (BT-31), use value “VAT”, for the seller tax registration identifier (BT-32), use != "VAT"
     *
     * @name `cac:TaxScheme`
     */
    taxSchemeId: PeppolPartyTaxSchemeId,
  }).pipe(Schema.toStandardSchemaV1)
) {}
