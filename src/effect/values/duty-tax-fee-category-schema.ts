import { Schema } from 'effect';

import type { DutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

/**
 * @description A duty, tax or fee category code as defined by the PEPPOL subset of UNCL 5305 (VAT category code).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5305/
 */
export type PeppolDutyTaxFeeCategoryCode = DutyTaxFeeCategoriesKeys;

/**
 * @description Validates a duty, tax or fee category code against the PEPPOL subset of UNCL 5305 (VAT category code).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid duty/tax/fee category codes.
 *
 * @validations
 * - BR-CL-17 / BR-CL-18: VAT category code MUST be a valid UNCL 5305 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5305/
 */
export function dutyTaxFeeCategorySchema(error?: string) {
  const schema = Schema.Literals(dutyTaxFeeCategoriesKeys);
  return error === undefined ? schema : schema.annotate({ message: error });
}
