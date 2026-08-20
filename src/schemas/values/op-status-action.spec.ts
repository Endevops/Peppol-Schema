import { describe, expect, it } from 'vitest';

import { opStatusActionKeys } from '#/values/op-status-action.generated';

import { opStatusActionSchema } from './op-status-action';

describe('op-status-action-schema', () => {
  it.each(opStatusActionKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(opStatusActionSchema().parse(value)).toEqual(expected);
  });
});
