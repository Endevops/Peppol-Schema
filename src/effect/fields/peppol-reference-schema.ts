import { Schema } from 'effect';

class PeppolReferenceId extends Schema.Opaque<PeppolReferenceId>()(Schema.Struct({ id: Schema.String })) {}

export const peppolReferenceSchema = Schema.Union([PeppolReferenceId, Schema.Undefined]);

export type PeppolReferenceSchema = typeof peppolReferenceSchema.Type;
