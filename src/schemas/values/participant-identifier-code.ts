import * as z from 'zod/mini';

import type { participantIdentifierSchemesKey } from '#/values/participant-identifier-schemes.generated';

import { participantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

export type ParticipantIdentifierCode = participantIdentifierSchemesKey;

export function participantIdentifierCodeSchema(error?: string) {
  return z.string().check(z.refine(val => participantIdentifierSchemesKeys.includes(val as ParticipantIdentifierCode), error));
}
