import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { participantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

/**
 * @description Validates a PEPPOL participant identifier scheme against the participant identifier schemes list.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid participant identifier schemes.
 */
export class PeppolParticipantIdentifierCode extends opaque<PeppolParticipantIdentifierCode>()(
  Schema.Literals(participantIdentifierSchemesKeys).pipe(Schema.brand('PeppolParticipantIdentifierCode'))
) {}
