import { Schema } from 'effect';

import { dutyTaxFeeCategoriesKeys } from '#/values/duty-tax-fee-categories.generated';

/**
 * @description A duty, tax or fee category code from the PEPPOL subset of UNCL 5305 (VAT category code).
 *
 * @example
 *   ```ts
 *   'AE';
 *   ```;
 *
 * @validations
 * - BR-CL-17 / BR-CL-18: VAT category code MUST be a valid UNCL 5305 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5305/
 * @see {@link dutyTaxFeeCategoriesKeys}
 */
export const PeppolDutyTaxFeeCategoryCode = Schema.Literals(dutyTaxFeeCategoriesKeys).pipe(
  Schema.brand('PeppolDutyTaxFeeCategoryCode'),
  Schema.toStandardSchemaV1
);

/**
 * @description Decoded form of {@link PeppolDutyTaxFeeCategoryCode}.
 */
export type PeppolDutyTaxFeeCategoryCode = Schema.Schema.Type<typeof PeppolDutyTaxFeeCategoryCode>;

/**
 * @description The encoded form of {@link PeppolDutyTaxFeeCategoryCode}, a string literal union.
 */
export type PeppolDutyTaxFeeCategoryCodeEncoded = Schema.Codec.Encoded<typeof PeppolDutyTaxFeeCategoryCode>;
