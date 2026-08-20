import { describe, expect, it } from 'vitest';

import { icdCodesKeys } from '#/values/icd-codes.generated';

import { icdCodesSchema } from './icd-codes';

describe('icd-codes', () => {
  it.each(icdCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(icdCodesSchema().parse(value)).toEqual(expected);
  });
});
