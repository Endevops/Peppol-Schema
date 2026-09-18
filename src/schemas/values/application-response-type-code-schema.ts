import { Schema } from 'effect';

import { applicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated';

/**
 * @description An application response type code from the PEPPOL subset of UNCL 4343.
 *
 * @example
 *   ```ts
 *   'AB';
 *   ```;
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4343/
 * @see {@link applicationResponseTypeCodesKeys}
 */
export const PeppolApplicationResponseTypeCode = Schema.Literals(applicationResponseTypeCodesKeys).pipe(Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolApplicationResponseTypeCode}.
 */
export type PeppolApplicationResponseTypeCode = Schema.Schema.Type<typeof PeppolApplicationResponseTypeCode>;
