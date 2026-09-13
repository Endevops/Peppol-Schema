import { Effect, Schema } from 'effect';

import { opaque } from '#/effect/utils/opaque';
import { peppolDutyTaxFeeCategorySchema } from '#/effect/values/duty-tax-fee-category-schema';

export class PeppolTaxSchemeId extends opaque<PeppolTaxSchemeId>()(
  Schema.Struct({
    /**
     * @name `cbc:ID`
     */
    id: Schema.String.pipe(Schema.withDecodingDefaultType(Effect.succeed('VAT'))),
  })
) {}

/**
 * @description A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.
 *
 * @summary LINE VAT INFORMATION
 *
 * @name `cac:TaxCategory`
 */
export class PeppolTaxCategory extends opaque<PeppolTaxCategory>()(
  Schema.Struct({
    /**
     * @description The VAT category code for the invoiced item.
     *
     * @summary Invoiced item VAT category code
     *
     * @name `cbc:ID`
     */
    id: peppolDutyTaxFeeCategorySchema,
    /**
     * @description The VAT rate, represented as percentage that applies to the invoiced item.
     *
     * @summary Invoiced item VAT rate
     *
     * @name `cbc:Percent`
     */
    percent: Schema.optional(Schema.Finite),
    /**
     * @default VAT
     *
     * @name `cac:TaxScheme`
     */
    taxSchemeId: PeppolTaxSchemeId,
  })
) {}
