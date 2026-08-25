import * as z from 'zod/mini';

import type { DutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

/**
 * @description A duty, tax or fee category code as defined by the PEPPOL subset of UNCL 5305 (VAT category code).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5305/
 */
export type PeppolDutyTaxFeeCategory = DutyTaxFeeCategoriesKeys;

/**
 * @description Validates a duty, tax or fee category code against the PEPPOL subset of UNCL 5305 (VAT category code).
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid duty/tax/fee category codes.
 *
 * @validations
 * - BR-CL-17 / BR-CL-18: VAT category code MUST be a valid UNCL 5305 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5305/
 */
export function dutyTaxFeeCategorySchema(error?: string) {
  return z.string().check(z.refine(val => dutyTaxFeeCategoriesKeys.includes(val as never), error));
}
