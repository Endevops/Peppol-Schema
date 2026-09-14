import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque';

class PeppolReferenceId extends opaque<PeppolReferenceId>()(Schema.Struct({ id: Schema.String })) {}

export const peppolReferenceSchema = Schema.Union([PeppolReferenceId, Schema.Undefined]);

export type PeppolReferenceSchema = typeof peppolReferenceSchema.Type;
