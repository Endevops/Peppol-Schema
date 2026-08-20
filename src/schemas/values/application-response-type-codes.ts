import * as z from 'zod/mini';

import type { applicationResponseTypeCodesKey } from '#/values/application-response-type-codes.generated';

import { applicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated';

export type ApplicationResponseTypeCodes = applicationResponseTypeCodesKey;

export function applicationResponseTypeCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => applicationResponseTypeCodesKeys.includes(val as ApplicationResponseTypeCodes), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('document-type-code-schema', () => {
    it.each(applicationResponseTypeCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(applicationResponseTypeCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
