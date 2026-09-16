/**
 * @module effect/values/eas-codes
 * Electronic Address Scheme (EAS) codes as used in PEPPOL networks
 * These codes identify the scheme used for electronic addresses of parties
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/
 */
import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { electronicAddressCodesKeys } from '#/values/eas-codes.generated';

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
export class PeppolElectronicAddressCode extends opaque<PeppolElectronicAddressCode>()(
  Schema.Literals(electronicAddressCodesKeys).pipe(Schema.brand('PeppolElectronicAddressCode'))
) {}
