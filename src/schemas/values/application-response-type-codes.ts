import * as z from 'zod/mini';

import type { ApplicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated';

import { applicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated';

/**
 * @description An application response type code as defined by the PEPPOL subset of UNCL 4343.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4343/
 */
export type PeppolApplicationResponseTypeCode = ApplicationResponseTypeCodesKeys;

/**
 * @description Validates an application response type code against the PEPPOL subset of UNCL 4343.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid application response type codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4343/
 */
export function applicationResponseTypeCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => applicationResponseTypeCodesKeys.includes(val as never), error));
}
