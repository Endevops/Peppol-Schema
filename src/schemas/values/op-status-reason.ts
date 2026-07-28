import * as z from 'zod/mini';
import { opStatusReasonKeys, type opStatusReasonKey } from '#/values/op-status-reason.generated';

export type OpStatusReason = opStatusReasonKey;

export function opStatusReasonSchema(error?: string) {
  return z.string().check(z.refine(val => opStatusReasonKeys.includes(val), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('op-status-reason-schema', () => {
    it.each(opStatusReasonKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(opStatusReasonSchema().parse(value)).toEqual(expected);
    });
  });
}
