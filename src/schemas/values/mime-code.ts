import * as z from 'zod/mini';

import type { MimeCodesKeys } from '#/values/mime-codes.generated';

import { mimeCodesKeys } from '#/values/mime-codes.generated';

/**
 * @description A MIME media type code (e.g. `application/pdf`) as used for attached documents.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/MimeCode/
 */
export type PeppolMimeCode = MimeCodesKeys;

/**
 * @description Validates a MIME media type against the PEPPOL MIME code list.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid MIME types.
 *
 * @validations
 * - PEPPOL-EN16931-CL001: Attachment (MIME) type MUST come from the allowed list.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/MimeCode/
 */
export function mimeCodesSchema(error?: string) {
  return z.string().check(z.refine(val => mimeCodesKeys.includes(val as (typeof mimeCodesKeys)[number]), error));
}
