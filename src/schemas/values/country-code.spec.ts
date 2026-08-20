import { describe, expect, it } from 'vitest';
import * as z from 'zod/mini';

import { countryCodesKeys } from '#/values/country-code.generated';

import { countryCodeSchema } from './country-code';

describe('country-code', () => {
  it.each(countryCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(z.parse(countryCodeSchema, value)).toEqual(expected);
  });
});
