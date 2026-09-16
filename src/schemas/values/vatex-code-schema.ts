import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { vatexCodesKeys } from '#/values/vatex-codes.generated';

/**
 * @description Validates a VAT exemption reason code against the CEF VATEX codelist.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid VAT exemption reason codes.
 *
 * @validations
 * - BR-CL-22: VAT exemption reason code MUST be a valid CEF VATEX code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/vatex/
 */
export class PeppolVatexCode extends opaque<PeppolVatexCode>()(Schema.Literals(vatexCodesKeys).pipe(Schema.brand('PeppolVatexCode'))) {}
