import { Schema } from 'effect';

import { CBC_NAMESPACE } from '#/schemas/namespaces.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description Wraps the `cac:ContractDocumentReference` element: an identifier of a contract that the billing document references.
 *
 * @example
 *   ```ts
 *   { id: '123Contractref' }
 *   ```;
 *
 * @see {@link PeppolBillingBase}
 */
export class PeppolContractDocumentReference extends opaque<PeppolContractDocumentReference>()(
  Schema.Struct({
    /**
     * @description An identifier of a referenced contract.
     *
     * @example
     *   `123Contractref`;
     *
     * @summary Contract reference
     *
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ID',
        examples: ['123Contractref'],
        description: 'An identifier of a referenced contract.',
      })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description Wraps the `cac:OriginatorDocumentReference` element: the identification of the call for tender or lot the invoice relates to.
 *
 * @example
 *   ```ts
 *   { id: 'PPID-123' }
 *   ```;
 *
 * @see {@link PeppolBillingBase}
 */
export class PeppolOriginatorDocumentReference extends opaque<PeppolOriginatorDocumentReference>()(
  Schema.Struct({
    /**
     * @description The identification of the call for tender or lot the invoice relates to.
     *
     * @example
     *   `PPID-123`;
     *
     * @summary Tender or lot reference
     *
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(
      Schema.annotate({
        description: 'The identification of the call for tender or lot the invoice relates to.',
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ID',
        examples: ['PPID-123'],
      })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description Wraps the `cac:ReceiptDocumentReference` element: an identifier of a referenced receiving advice.
 *
 * @example
 *   ```ts
 *   { id: 'rec98' }
 *   ```;
 *
 * @see {@link PeppolBillingBase}
 */
export class PeppolReceiptDocumentReference extends opaque<PeppolReceiptDocumentReference>()(
  Schema.Struct({
    /**
     * @description An identifier of a referenced receiving advice.
     *
     * @example
     *   `rec98`;
     *
     * @summary Receiving advice reference
     *
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ID',
        title: 'Receiving advice reference',
        description: 'An identifier of a referenced receiving advice.',
        examples: ['rec98'],
      })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}

/**
 * @description Wraps the `cac:DespatchDocumentReference` element: an identifier of a referenced despatch advice.
 *
 * @example
 *   ```ts
 *   { id: 'desp98' }
 *   ```;
 *
 * @see {@link PeppolBillingBase}
 */
export class PeppolDespatchDocumentReference extends opaque<PeppolDespatchDocumentReference>()(
  Schema.Struct({
    /**
     * @description An identifier of a referenced despatch advice.
     *
     * @example
     *   `desp98`;
     *
     * @summary Despatch advice reference
     *
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(
      Schema.annotate({
        xmlNamespace: CBC_NAMESPACE,
        xmlPrefix: 'cbc',
        xmlName: 'ID',
        title: 'Despatch advice reference',
        description: 'An identifier of a referenced despatch advice.',
        examples: ['desp98'],
      })
    ),
  }).pipe(Schema.toStandardSchemaV1)
) {}
