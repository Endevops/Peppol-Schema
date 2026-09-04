/**
 * @module effect/values/eas-codes
 * Electronic Address Scheme (EAS) codes as used in PEPPOL networks
 * These codes identify the scheme used for electronic addresses of parties
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/
 */
import { Schema } from 'effect';

import type { ElectronicAddressCodesKeys } from '#/values/eas-codes.generated';

import { electronicAddressCodesKeys } from '#/values/eas-codes.generated';

/**
 * @description An electronic address scheme (EAS) code, identifying the scheme of an electronic address (e.g. `0088` for GLN).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/
 */
export type PeppolElectronicAddressCode = ElectronicAddressCodesKeys;

/**
 * @description Validates an electronic address scheme (EAS) code against the PEPPOL Electronic Address Identifier Scheme codelist.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid electronic address scheme codes.
 *
 * @validations
 * - PEPPOL-EN16931-CL008: Electronic address identifier scheme MUST be from the codelist "Electronic Address Identifier Scheme".
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/
 */
export function electronicCodesSchema(error?: string) {
  const schema = Schema.Literals(electronicAddressCodesKeys);
  return error === undefined ? schema : schema.annotate({ message: error });
}
