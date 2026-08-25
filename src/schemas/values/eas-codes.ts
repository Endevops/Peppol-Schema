/**
 * @module schemas/values/eas-codes
 * Electronic Address Scheme (EAS) codes as used in PEPPOL networks
 * These codes identify the scheme used for electronic addresses of parties
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/
 */
import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { electronicAddressCodesKeys } from '#/values/eas-codes.generated';

export type ElectronicAddressCode = Brand.Branded<string, 'ElectronicAddressCode'>;

/**
 * @validations
 * - PEPPOL-EN16931-CL008: Electronic address identifier scheme must be from the codelist "Electronic Address Identifier Scheme"
 */
export function electronicCodesSchema(error?: string) {
  return z.string().check(z.refine(val => electronicAddressCodesKeys.includes(val as (typeof electronicAddressCodesKeys)[number]), error));
}
