import { Schema } from 'effect';

import { CAC_NAMESPACE, CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A reference to the order line that the Invoice line fulfils. Wraps the `cac:OrderLineReference` element and its `cbc:LineID`.
 *
 * @example
 *   ```ts
 *   { lineId: '123' }
 *   ```;
 */
export class PeppolOrderLineReference extends opaque<PeppolOrderLineReference>()(
  Schema.Struct({
    lineId: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'LineID',
        description: 'A unique identifier for the individual line within the Order.',
        title: 'Order line identifier',
        examples: ['123'],
      })
    ),
  }).pipe(
    Schema.annotate({ xmlNamespace: CAC_NAMESPACE, xmlPrefix: 'cac', xmlName: 'OrderLineReference', title: 'Order line reference' }),
    Schema.toStandardSchemaV1
  )
) {}
