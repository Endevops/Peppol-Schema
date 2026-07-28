import * as z from 'zod/mini';

/**
 * @name cac:PartyTaxScheme (0..2)
 */
export const partyTaxSchemeSchema = z.object({
  /**
   * @description The Seller's VAT identifier (also known as Seller VAT identification number) or the local identification (defined by the Seller’s address) of the
   * Seller for tax purposes or a reference that enables the Seller to state his registered tax status. In order for the buyer to automatically
   * identify a supplier, the Seller identifier (BT-29), the Seller legal registration identifier (BT-30) and/or the Seller VAT identifier (BT-31)
   * shall be present.
   *
   * @summary Seller VAT identifier, Seller tax registration identifier
   *
   * @name `cbc:CompanyID`
   */
  companyId: z.string(),
  /**
   * @description Mandatory element. For Seller VAT identifier (BT-31), use value “VAT”, for the seller tax registration identifier (BT-32), use != "VAT"
   *
   * @name `cac:TaxScheme`
   */
  taxSchemeId: z.object({
    /**
     * @description Mandatory element. For Seller VAT identifier (BT-31), use value “VAT”, for the seller tax registration identifier (BT-32), use != "VAT"
     *
     * @name cbc:ID
     */
    id: z._default(z.string(), 'VAT'),
  }),
});

export type PeppolPartyTaxSchema = z.infer<typeof partyTaxSchemeSchema>;
