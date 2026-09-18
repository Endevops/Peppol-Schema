import { Schema } from 'effect';

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
export const PeppolParticipantIdentifierCode = Schema.Literals(participantIdentifierSchemesKeys).pipe(
  Schema.brand('PeppolParticipantIdentifierCode'),
  Schema.toStandardSchemaV1
);

/**
 * @description Decoded form of {@link PeppolParticipantIdentifierCode}.
 */
export type PeppolParticipantIdentifierCode = Schema.Schema.Type<typeof PeppolParticipantIdentifierCode>;
