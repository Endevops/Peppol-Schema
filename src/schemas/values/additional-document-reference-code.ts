import * as z from 'zod/mini';

import type { additionalDocumentReferenceCodesKey } from '#/values/additional-document-reference-codes.generated';

import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

export type AdditionalDocumentReferenceCode = additionalDocumentReferenceCodesKey;

export function additionalDocumentReferenceCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => additionalDocumentReferenceCodesKeys.includes(val as AdditionalDocumentReferenceCode), error));
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('additional-document-reference-schema', () => {
    it.each(additionalDocumentReferenceCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(additionalDocumentReferenceCodeSchema().parse(value)).toEqual(expected);
    });
  });
}
