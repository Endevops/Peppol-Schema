import { Schema } from 'effect';

import { participantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

/**
 * @description A PEPPOL participant identifier scheme, identifying the scheme of a participant identifier (e.g. EAS codes).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/
 */
export type PeppolParticipantIdentifierCode = typeof participantIdentifierCodeSchema.Type;

/**
 * @description Validates a PEPPOL participant identifier scheme against the participant identifier schemes list.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid participant identifier schemes.
 */
export const participantIdentifierCodeSchema = Schema.Literals(participantIdentifierSchemesKeys).pipe(
  Schema.brand('PeppolParticipantIdentifierCode')
);
