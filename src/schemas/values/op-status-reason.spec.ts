import { describe, expect, it } from 'vitest';

import { opStatusReasonKeys } from '#/values/op-status-reason.generated';

import { opStatusReasonSchema } from './op-status-reason';

describe('op-status-reason-schema', () => {
  it.each(opStatusReasonKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(opStatusReasonSchema().parse(value)).toEqual(expected);
  });
});
