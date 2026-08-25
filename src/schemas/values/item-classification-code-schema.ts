import * as z from 'zod/mini';

import type { ItemClassificationCodesKeys } from '#/values/item-classification-code.generated';

import { itemClassificationCodesKeys } from '#/values/item-classification-code.generated';

/**
 * @description An item classification code as defined by the PEPPOL subset of UNCL 7143.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7143/
 */
export type PeppolItemClassificationCodes = ItemClassificationCodesKeys;

/**
 * @description Validates an item classification code against the PEPPOL subset of UNCL 7143.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid item classification codes.
 *
 * @validations
 * - BR-CL-13: Item classification scheme MUST be a valid UNTDID 7143 code.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7143/
 */
export function itemClassificationCodesSchema(error?: string) {
  return z.string().check(z.refine(val => itemClassificationCodesKeys.includes(val as never), error));
}
