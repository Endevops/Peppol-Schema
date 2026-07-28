import * as z from 'zod/mini';

/**
 * @summary Identifier with optional scheme
 *
 * @name `cbc:ID (+ optional @schemeID)`
 */
export function identifierSchema(message?: string | z.core.$ZodObjectParams) {
  return z.object(
    {
      /**
       * @name cbc:ID
       */
      id: z.string(),
      /**
       * @name `@schemeID`
       */
      schemeId: z.optional(z.string()),
    },
    message
  );
}

export type PeppolIdentifier = z.infer<ReturnType<typeof identifierSchema>>;
