import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { applicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated';

/**
 * @description Validates an application response type code against the PEPPOL subset of UNCL 4343.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid application response type codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4343/
 */
export class PeppolApplicationResponseTypeCode extends opaque<PeppolApplicationResponseTypeCode>()(
  Schema.Literals(applicationResponseTypeCodesKeys)
) {}
