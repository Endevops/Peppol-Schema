import { Schema } from 'effect';

import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A contact point for a party, such as the person responsible for receiving the Invoice. Wraps the `cac:Contact` element with an optional name,
 * telephone number and electronic mail address.
 *
 * @example
 *   ```ts
 *   { name: 'Lisa Johnson', telephone: '23434234', electronicMail: 'lj@buyer.se' }
 *   ```;
 *
 * @see {@link PeppolPartySchema}
 */
export class PeppolContact extends opaque<PeppolContact>()(
  Schema.Struct({
    /**
     * @name cbc:ElectronicMail
     */
    electronicMail: Schema.optional(Schema.String).pipe(
      Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'ElectronicMail' })
    ),
    /**
     * @name cbc:Name
     */
    name: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Name' }), Schema.optional),
    /**
     * @name cbc:Telephone
     */
    telephone: Schema.String.pipe(Schema.annotate({ xmlNamespace: CBC_NAMESPACE, xmlPrefix: 'cbc', xmlName: 'Telephone' }), Schema.optional),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Contact' }), Schema.toStandardSchemaV1)
) {}
