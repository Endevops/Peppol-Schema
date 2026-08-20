import { describe, expect, it } from 'vitest';

import { mimeCodesKeys } from '#/values/mime-codes.generated';

import { mimeCodesSchema } from './mime-code';

describe('mime-codes', () => {
  it.each(mimeCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(mimeCodesSchema().parse(value)).toEqual(expected);
  });
});
