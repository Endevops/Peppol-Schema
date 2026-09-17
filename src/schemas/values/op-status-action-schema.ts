import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
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
export class PeppolOpStatusAction extends opaque<PeppolOpStatusAction>()(
  Schema.Literals(opStatusActionKeys).pipe(Schema.brand('PeppolOpStatusAction'))
) {}
