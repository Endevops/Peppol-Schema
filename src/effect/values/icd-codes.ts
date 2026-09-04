import { Schema } from 'effect';

import type { IcdCodesKeys } from '#/values/icd-codes.generated';

import { icdCodesKeys } from '#/values/icd-codes.generated';

/**
 * @description An ISO 6523 ICD (International Code Designator) code identifying an identifier scheme.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/
 */
export type PeppolIcdCode = IcdCodesKeys;

/**
 * @description Validates an ISO 6523 ICD code against the PEPPOL codelist.
 *
 * @param error - The custom error message to use when validation fails. Defaults to `'Invalid ICD code provided'`.
 *
 * @returns An Effect schema that accepts only valid ICD codes.
 *
 * @validations
 * - BR-CL-10 / BR-CL-11 / BR-CL-21: Identifier scheme MUST be a valid ISO 6523 ICD code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/
 */
export function icdCodesSchema(error = 'Invalid ICD code provided') {
  return Schema.Literals(icdCodesKeys).annotate({ message: error });
}
