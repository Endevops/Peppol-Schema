/**
 * @module effect/values/eas-codes
 * Electronic Address Scheme (EAS) codes as used in PEPPOL networks
 * These codes identify the scheme used for electronic addresses of parties
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/
 */
import { Schema } from 'effect';

import { electronicAddressCodesKeys } from '#/values/eas-codes.generated';

/**
 * @description An electronic address scheme (EAS) code from the PEPPOL Electronic Address Identifier Scheme codelist.
 *
 * @example
 *   ```ts
 *   '0002';
 *   ```;
 *
 * @validations
 * - PEPPOL-EN16931-CL008: Electronic address identifier scheme MUST be from the codelist "Electronic Address Identifier Scheme".
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/
 * @see {@link electronicAddressCodesKeys}
 */
export const PeppolElectronicAddressCode = Schema.Literals(electronicAddressCodesKeys).pipe(
  Schema.brand('PeppolElectronicAddressCode'),
  Schema.toStandardSchemaV1
);

/**
 * @description Decoded form of {@link PeppolElectronicAddressCode}.
 */
export type PeppolElectronicAddressCode = Schema.Schema.Type<typeof PeppolElectronicAddressCode>;
