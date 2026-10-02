import { Schema } from 'effect';

import { PeppolAddress } from '#/schemas/fields/peppol-address-schema.ts';
import { PeppolPartyTaxScheme } from '#/schemas/fields/peppol-party-tax-scheme-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description The party acting as the Seller tax representative, including its name, postal address, and tax scheme.
 *
 * @summary SELLER TAX REPRESENTATIVE PARTY
 *
 * @name cac:TaxRepresentativeParty
 */
export class PeppolTaxRepresentative extends opaque<PeppolTaxRepresentative>()(
  Schema.Struct({
    /**
     * @description The name of the Seller tax representative.
     *
     * @name `cac:PartyName`
     */
    partyName: Schema.Struct({
      /**
       * @description The name of the Seller tax representative.
       *
       * @name `cbc:Name`
       */
      name: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Name' })),
    }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PartyName' })),

    /**
     * @name cac:PostalAddress
     */
    postalAddress: PeppolAddress.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PostalAddress' })),
    /**
     * @name cac:PartyTaxScheme
     */
    partyTaxScheme: PeppolPartyTaxScheme.pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PartyTaxScheme' })),
  }).pipe(
    Schema.annotate({
      xmlNamespace: CAC_NAMESPACE,
      xmlPrefix: 'cac',
      xmlName: 'TaxRepresentativeParty',
      description: 'SELLER TAX REPRESENTATIVE PARTY.',
    }),
    Schema.toStandardSchemaV1
  )
) {}
