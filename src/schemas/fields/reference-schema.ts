import * as z from 'zod/mini';

export const referenceSchema = z.optional(z.object({ id: z.string() }));
export type PeppolReferenceSchema = z.infer<typeof referenceSchema>;
