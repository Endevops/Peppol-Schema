import { Schema } from 'effect';

import { quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

/**
 * @description A unit of measure code from the PEPPOL subset of UN/ECE Recommendation 20.
 *
 * @example
 *   ```ts
 *   '10';
 *   ```;
 *
 * @validations
 * - BR-CL-23: Unit of measure code MUST be a valid UN/ECE Rec 20 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNECERec20/
 * @see {@link quantityUnitCodesKeys}
 */
export const PeppolQuantityUnitCode = Schema.Literals(quantityUnitCodesKeys).pipe(Schema.brand('PeppolQuantityUnitCode'), Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolQuantityUnitCode}.
 */
export type PeppolQuantityUnitCode = Schema.Schema.Type<typeof PeppolQuantityUnitCode>;
