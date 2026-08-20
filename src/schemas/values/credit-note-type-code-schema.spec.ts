import { describe, expect, it } from 'vitest';

import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

import { creditNoteTypeCodeSchema } from './credit-note-type-code-schema';

describe('credit-note-type-codes', () => {
  it.each(creditNoteTypeCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(creditNoteTypeCodeSchema().parse(value)).toEqual(expected);
  });
});
