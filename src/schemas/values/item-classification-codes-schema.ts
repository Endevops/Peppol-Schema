import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { itemClassificationCodesKeys } from '#/values/item-classification-code.generated';

/**
 * @description Validates an item classification code against the PEPPOL subset of UNCL 7143.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid item classification codes.
 *
 * @validations
 * - BR-CL-13: Item classification scheme MUST be a valid UNTDID 7143 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7143/
 */
export class PeppolItemClassificationCode extends opaque<PeppolItemClassificationCode>()(
  Schema.Literals(itemClassificationCodesKeys).pipe(Schema.brand('PeppolItemClassificationCode'))
) {}
