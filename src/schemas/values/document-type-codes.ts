import * as z from 'zod/mini';

import type { documentTypeCodesKey } from '#/values/document-type-codes.generated';

import { documentTypeCodesKeys } from '#/values/document-type-codes.generated';

export type DocumentTypeCode = documentTypeCodesKey;

export function documentTypeCodeSchema(error?: string) {
  return z.string().check(z.refine(val => documentTypeCodesKeys.includes(val as DocumentTypeCode), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('document-type-code-schema', () => {
    it.each(documentTypeCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(documentTypeCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
