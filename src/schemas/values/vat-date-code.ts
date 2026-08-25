import * as z from 'zod/mini';

import type { VatDateCodesKeys } from '#/values/vat-dates.generated';

import { vatDateCodesKeys } from '#/values/vat-dates.generated';

export type PeppolVatDateCode = VatDateCodesKeys;

/**
 * @validations
 * - PEPPOL-EN16931-CL006: Invoice period description code must be according to UNCL 2005 D.16B.
 */
export function vatDateCodeSchema(error?: string) {
  return z.string().check(z.refine(val => vatDateCodesKeys.includes(val as never), error));
}
