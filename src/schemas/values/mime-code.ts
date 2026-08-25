import * as z from 'zod/mini';

import type { MimeCodesKeys } from '#/values/mime-codes.generated';

import { mimeCodesKeys } from '#/values/mime-codes.generated';

export type PeppolMimeCode = MimeCodesKeys;

/**
 * @validations
 * - PEPPOL-EN16931-CL001: Electronic address identifier scheme must be from the codelist "Electronic Address Identifier Scheme"
 */
export function mimeCodesSchema(error?: string) {
  return z.string().check(z.refine(val => mimeCodesKeys.includes(val as (typeof mimeCodesKeys)[number]), error));
}
