import * as z from 'zod/mini';
import { type opStatusActionKey, opStatusActionKeys } from '#/values/op-status-action.generated';

export type OpStatusAction = opStatusActionKey;

export function opStatusActionSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusActionKeys.includes(val), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('op-status-action-schema', () => {
    it.each(opStatusActionKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(opStatusActionSchema().parse(value)).toEqual(expected);
    });
  });
}
