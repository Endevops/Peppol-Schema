import { describe, expect, it } from 'vitest';

import { referenceSchema } from './reference-schema';

describe('referenceSchema', () => {
  it('accepts an object with an id', () => {
    expect(referenceSchema.parse({ id: 'REF-1' })).toEqual({ id: 'REF-1' });
  });

  it('returns undefined when the value is absent', () => {
    expect(referenceSchema.parse(undefined)).toBeUndefined();
  });
});
