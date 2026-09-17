import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { itemClassificationCodesKeys } from '#/values/item-classification-code.generated';

/**
 * @description An item classification code from the PEPPOL subset of UNCL 7143.
 *
 * @example
 *   ```ts
 *   'AA';
 *   ```;
 *
 * @validations
 * - BR-CL-13: Item classification scheme MUST be a valid UNTDID 7143 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7143/
 * @see {@link itemClassificationCodesKeys}
 */
export class PeppolItemClassificationCode extends opaque<PeppolItemClassificationCode>()(
  Schema.Literals(itemClassificationCodesKeys).pipe(Schema.brand('PeppolItemClassificationCode'))
) {}
