import { describe, expect, it } from 'vitest';

import { vatDateCodesKeys } from '#/values/vat-dates.generated';

import { vatDateCodeSchema } from './vat-date-code';

describe('vat-date-code', () => {
  it.each(vatDateCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(vatDateCodeSchema().parse(value)).toEqual(expected);
  });
});
