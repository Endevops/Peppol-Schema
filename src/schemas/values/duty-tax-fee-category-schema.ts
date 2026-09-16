import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

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
export class PeppolDutyTaxFeeCategoryCode extends opaque<PeppolDutyTaxFeeCategoryCode>()(
  Schema.Literals(dutyTaxFeeCategoriesKeys).pipe(Schema.brand('PeppolDutyTaxFeeCategoryCode'))
) {}

export type PeppolDutyTaxFeeCategoryCodeEncoded = Schema.Codec.Encoded<typeof PeppolDutyTaxFeeCategoryCode>;
