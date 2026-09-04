import { Schema } from 'effect';

import type { VatDateCodesKeys } from '#/values/vat-dates.generated';

import { vatDateCodesKeys } from '#/values/vat-dates.generated';

export type PeppolVatDateCode = VatDateCodesKeys;

/**
 * @validations
 * - PEPPOL-EN16931-CL006: Invoice period description code must be according to UNCL 2005 D.16B.
 */
export function vatDateCodeSchema(error?: string) {
  const schema = Schema.Literals(vatDateCodesKeys);
  return error === undefined ? schema : schema.annotate({ message: error });
}
