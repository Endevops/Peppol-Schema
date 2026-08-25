import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { participantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

export type ParticipantIdentifierCode = Brand.Branded<string, 'ParticipantIdentifierCode'>;

export function participantIdentifierCodeSchema(error?: string) {
  return z
    .string()
    .check(z.refine(val => participantIdentifierSchemesKeys.includes(val as (typeof participantIdentifierSchemesKeys)[number]), error));
}
