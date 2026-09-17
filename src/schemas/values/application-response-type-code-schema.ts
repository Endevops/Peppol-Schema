import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
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
export class PeppolApplicationResponseTypeCode extends opaque<PeppolApplicationResponseTypeCode>()(
  Schema.Literals(applicationResponseTypeCodesKeys)
) {}
