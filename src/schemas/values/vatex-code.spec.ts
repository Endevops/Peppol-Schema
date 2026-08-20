import { describe, expect, it } from 'vitest';

import { vatexCodesKeys } from '#/values/vatex-codes.generated';

import { vatexCodeschema } from './vatex-code';

describe('vatex-code', () => {
  it.each(vatexCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(vatexCodeschema().parse(value)).toEqual(expected);
  });
});
