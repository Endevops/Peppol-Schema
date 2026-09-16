import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { icdCodesKeys } from '#/values/icd-codes.generated';

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
export class PeppolIcdCode extends opaque<PeppolIcdCode>()(Schema.Literals(icdCodesKeys).pipe(Schema.brand('PeppolIcdCode'))) {}
