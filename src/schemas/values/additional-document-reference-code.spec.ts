import { describe, expect, it } from 'vitest';

import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

import { additionalDocumentReferenceCodeSchema } from './additional-document-reference-code';

describe('additional-document-reference-schema', () => {
  it.each(additionalDocumentReferenceCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(additionalDocumentReferenceCodeSchema().parse(value)).toEqual(expected);
  });
});
