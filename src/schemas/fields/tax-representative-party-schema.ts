import * as z from 'zod/mini';
import { addressSchema } from '#/schemas/fields/address-schema';
import { partyTaxSchemeSchema } from '#/schemas/fields/party-tax-schema';

/**
 * @summary SELLER TAX REPRESENTATIVE PARTY
 *
 * @name cac:TaxRepresentativeParty
 */
export const taxRepresentativeSchema = z.object({
  /**
   * @name cac:PartyName/cbc:Name
   */
  name: z.string(),
  /**
   * @name cac:PostalAddress
   */
  postalAddress: addressSchema,
  partyTaxScheme: partyTaxSchemeSchema,
});

export type PeppolTaxRepresentativeParty = z.infer<typeof taxRepresentativeSchema>;
