import * as z from 'zod/mini';
import { type participantIdentifierSchemesKey, participantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

export type ParticipantIdentifierCode = participantIdentifierSchemesKey;

export function participantIdentifierCodeSchema(error?: string) {
  return z.string().check(z.refine(val => participantIdentifierSchemesKeys.includes(val), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('participant-identifier-codes', () => {
    it.each(participantIdentifierSchemesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(participantIdentifierCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
