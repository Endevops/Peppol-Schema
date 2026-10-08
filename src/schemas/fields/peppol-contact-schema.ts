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
     * @name cbc:Name
     */
    name: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Name',
        title: 'Name of the contact person',
        description: 'The name of the contact person responsible for receiving the Invoice.',
        examples: ['Lisa Johnson'],
      }),
      Schema.optional
    ),

    /**
     * @name cbc:Telephone
     */
    telephone: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'Telephone',
        examples: ['+46 8 123 456 78'],
        title: 'Telephone number of the contact person',
        description: 'The telephone number of the contact person responsible for receiving the Invoice.',
      }),
      Schema.optional
    ),

    /**
     * @name cbc:ElectronicMail
     */
    electronicMail: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ElectronicMail',
        examples: ['lj@buyer.se'],
        title: 'Electronic mail address of the contact person',
        description: 'The electronic mail address of the contact person responsible for receiving the Invoice.',
      }),
      Schema.optional
    ),
  }).pipe(Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'Contact' }), Schema.toStandardSchemaV1)
) {}
