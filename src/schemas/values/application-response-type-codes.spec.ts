import { describe, expect, it } from 'vitest';

import { applicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated';

import { applicationResponseTypeCodeSchema } from './application-response-type-codes';

describe('document-type-code-schema', () => {
  it.each(applicationResponseTypeCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(applicationResponseTypeCodeSchema().parse(value)).toEqual(expected);
  });
});
