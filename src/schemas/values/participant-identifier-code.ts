import * as z from 'zod/mini';

import type { ParticipantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

import { participantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

export type PeppolParticipantIdentifierCode = ParticipantIdentifierSchemesKeys;

export function participantIdentifierCodeSchema(error?: string) {
  return z
    .string()
    .check(z.refine(val => participantIdentifierSchemesKeys.includes(val as (typeof participantIdentifierSchemesKeys)[number]), error));
}
