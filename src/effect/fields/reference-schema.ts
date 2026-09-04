import { Schema } from 'effect';

export const referenceSchema = Schema.Union([Schema.Struct({ id: Schema.String }), Schema.Undefined]);

export type PeppolReferenceSchema = typeof referenceSchema.Type;
