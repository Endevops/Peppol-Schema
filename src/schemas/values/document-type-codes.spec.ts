import { describe, expect, it } from 'vitest';

import { documentTypeCodesKeys } from '#/values/document-type-codes.generated';

import { documentTypeCodeSchema } from './document-type-codes';

describe('document-type-code-schema', () => {
  it.each(documentTypeCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(documentTypeCodeSchema().parse(value)).toEqual(expected);
  });
});
