import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { participantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

/**
 * @description A PEPPOL participant identifier scheme from the participant identifier schemes codelist.
 *
 * @example
 *   ```ts
 *   '0002';
 *   ```;
 *
 * @see {@link participantIdentifierSchemesKeys}
 */
export class PeppolParticipantIdentifierCode extends opaque<PeppolParticipantIdentifierCode>()(
  Schema.Literals(participantIdentifierSchemesKeys).pipe(Schema.brand('PeppolParticipantIdentifierCode'), Schema.toStandardSchemaV1)
) {}
