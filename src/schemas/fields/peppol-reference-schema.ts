import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';

/**
 * @description A reference identifier, such as an order or sales order reference.
 *
 * @example
 *   ```ts
 *   { id: '123' }
 *   ```;
 */
export class PeppolReferenceId extends opaque<PeppolReferenceId>()(Schema.Struct({ id: Schema.String })) {}

/**
 * @description A schema for an optional reference identifier, accepting either {@link PeppolReferenceId} or `undefined`.
 *
 * @example
 *   ```ts
 *   peppolReferenceSchema; // Schema.Union([PeppolReferenceId, Schema.Undefined])
 *   ```;
 */
export const peppolReferenceSchema = Schema.Union([PeppolReferenceId, Schema.Undefined]);

/**
 * @description The decoded type of {@link peppolReferenceSchema}, either a {@link PeppolReferenceId} or `undefined`.
 */
export type PeppolReferenceSchema = Schema.Schema.Type<typeof peppolReferenceSchema>;
