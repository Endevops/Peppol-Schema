import { Schema } from 'effect';

import { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema.ts';
import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';
import { StringIdentifierSchema } from '#/schemas/utils/string-identifier-schema.ts';

/**
 * @description The legal entity details of a party, including the registered name and optional company identifiers.
 *
 * @example
 *   ```ts
 *   { registrationName: 'SupplierOfficialName Ltd', companyId: { id: 'GB983294' } }
 *   ```;
 *
 * @see {@link PeppolPartySchema}
 */
export class PeppolPartyLegalEntity extends opaque<PeppolPartyLegalEntity>()(
  Schema.Struct({
    /**
     * @example
     *   Full Formal Seller Name LTD.
     *
     * @name cbc:RegistrationName
     */
    registrationName: Schema.String.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'RegistrationName', examples: ['Full Formal Seller Name LTD.'] })
    ),

    /**
     * @example
     *   987654321;
     *
     * @name cbc:CompanyID (+ @schemeID)
     */
    companyId: StringIdentifierSchema(PeppolIdentifier).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'CompanyID', examples: [{ id: '987654321' }] }),
      Schema.optional
    ),
    /**
     * @example
     *   Share capital
     *
     * @name cbc:CompanyLegalForm
     */
    companyLegalForm: Schema.String.pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'CompanyLegalForm', examples: ['Share capital'] }),
      Schema.optional
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'PartyLegalEntity' }), Schema.toStandardSchemaV1)
) {}
