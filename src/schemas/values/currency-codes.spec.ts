import { describe, expect, it } from 'vitest';

import { currencyCodesKeys } from '#/values/currency-code.generated';

import { currencyCodeSchema } from './currency-codes';

describe('currency-code', () => {
  it.each(currencyCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(currencyCodeSchema().parse(value)).toEqual(expected);
  });
});
