import { describe, expect, it } from 'vitest';

import { participantIdentifierSchemesKeys } from '#/values/participant-identifier-schemes.generated';

import { participantIdentifierCodeSchema } from './participant-identifier-code';

describe('participant-identifier-codes', () => {
  it.each(participantIdentifierSchemesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(participantIdentifierCodeSchema().parse(value)).toEqual(expected);
  });
});
