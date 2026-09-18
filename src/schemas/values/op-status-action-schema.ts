import { Schema } from 'effect';

import { opStatusActionKeys } from '#/values/op-status-action.generated';

/**
 * @description An OpenPeppol operation status action code from the OPStatusAction codelist.
 *
 * @example
 *   ```ts
 *   'NOA';
 *   ```;
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/OPStatusAction/
 * @see {@link opStatusActionKeys}
 */
export const PeppolOpStatusAction = Schema.Literals(opStatusActionKeys).pipe(Schema.brand('PeppolOpStatusAction'), Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolOpStatusAction}.
 */
export type PeppolOpStatusAction = Schema.Schema.Type<typeof PeppolOpStatusAction>;
