import { Schema } from 'effect';

import { quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

/**
 * @description A unit of measure code as defined by the PEPPOL subset of UN/ECE Recommendation 20.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNECERec20/
 */
export type PeppolQuantityUnitCode = typeof quantityUnitCodesSchema.Type;

/**
 * @description Validates a unit of measure code against the PEPPOL subset of UN/ECE Recommendation 20.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid quantity unit codes.
 *
 * @validations
 * - BR-CL-23: Unit of measure code MUST be a valid UN/ECE Rec 20 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNECERec20/
 */
export const quantityUnitCodesSchema = Schema.Literals(quantityUnitCodesKeys).pipe(Schema.brand('PeppolQuantityUnitCode'));
