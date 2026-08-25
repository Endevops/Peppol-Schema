import * as z from 'zod/mini';

import type { QuantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

import { quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

/**
 * @description A unit of measure code as defined by the PEPPOL subset of UN/ECE Recommendation 20.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNECERec20/
 */
export type PeppolQuantityUnitCode = QuantityUnitCodesKeys;

/**
 * @description Validates a unit of measure code against the PEPPOL subset of UN/ECE Recommendation 20.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid quantity unit codes.
 *
 * @validations
 * - BR-CL-23: Unit of measure code MUST be a valid UN/ECE Rec 20 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNECERec20/
 */
export function quantityUnitCodesSchema(error?: string) {
  return z.string(error).check(z.refine(val => quantityUnitCodesKeys.includes(val as never)));
}
