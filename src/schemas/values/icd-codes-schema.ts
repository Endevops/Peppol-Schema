import { Schema } from 'effect';

import { icdCodesKeys } from '#/values/icd-codes.generated';

/**
 * @description An ISO 6523 ICD code from the PEPPOL codelist.
 *
 * @example
 *   ```ts
 *   '0002';
 *   ```;
 *
 * @validations
 * - BR-CL-10 / BR-CL-11 / BR-CL-21: Identifier scheme MUST be a valid ISO 6523 ICD code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/
 * @see {@link icdCodesKeys}
 */
export const PeppolIcdCode = Schema.Literals(icdCodesKeys).pipe(Schema.brand('PeppolIcdCode'), Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolIcdCode}.
 */
export type PeppolIcdCode = Schema.Schema.Type<typeof PeppolIcdCode>;
