import * as z from 'zod/mini';

import type { ParticipantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

import { participantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

/**
 * @description A PEPPOL participant identifier scheme, identifying the scheme of a participant identifier (e.g. EAS codes).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/
 */
export type PeppolParticipantIdentifierCode = ParticipantIdentifierSchemesKeys;

/**
 * @description Validates a PEPPOL participant identifier scheme against the participant identifier schemes list.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid participant identifier schemes.
 */
export function participantIdentifierCodeSchema(error?: string) {
  return z
    .string()
    .check(z.refine(val => participantIdentifierSchemesKeys.includes(val as (typeof participantIdentifierSchemesKeys)[number]), error));
}
