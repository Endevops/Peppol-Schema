import { describe, expect, it } from 'vitest';

import { electronicAddressCodesKeys } from '#/values/eas-codes.generated';

import { electronicCodesSchema } from './eas-codes';

describe('eas-codes', () => {
  it.each(electronicAddressCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(electronicCodesSchema().parse(value)).toEqual(expected);
  });
});
