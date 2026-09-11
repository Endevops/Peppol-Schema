import { Schema } from 'effect';

export const peppolReferenceSchema = Schema.Union([Schema.Struct({ id: Schema.String }), Schema.Undefined]);

export type PeppolReferenceSchema = typeof peppolReferenceSchema.Type;
