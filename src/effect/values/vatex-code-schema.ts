import { Schema } from 'effect';

import type { VatexCodesKeys } from '#/values/vatex-codes.generated';

import { vatexCodesKeys } from '#/values/vatex-codes.generated';

/**
 * @description A VAT exemption reason code as defined by the CEF VATEX codelist.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/vatex/
 */
export type PeppolVatexCode = VatexCodesKeys;

/**
 * @description Validates a VAT exemption reason code against the CEF VATEX codelist.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid VAT exemption reason codes.
 *
 * @validations
 * - BR-CL-22: VAT exemption reason code MUST be a valid CEF VATEX code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/vatex/
 */
export function vatexCodeSchema(error?: string) {
  const schema = Schema.Literals(vatexCodesKeys);
  return error === undefined ? schema : schema.annotate({ message: error });
}
