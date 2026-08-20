import { describe, expect, it } from 'vitest';

import { strOrArray } from './str-or-array';

describe('strOrArray', () => {
  it('returns a string for a plain string value', () => {
    expect(strOrArray({ 'cbc:Note': 'hello' }, 'cbc:Note')).toBe('hello');
  });

  it('maps object nodes to their text content when the value is an array', () => {
    expect(strOrArray({ 'cbc:Note': [{ '#text': 'a' }, { '#text': 'b' }] }, 'cbc:Note')).toEqual(['a', 'b']);
  });

  it('returns undefined when the value is missing', () => {
    expect(strOrArray({}, 'cbc:Note')).toBeUndefined();
  });

  it('returns undefined when the node is undefined', () => {
    expect(strOrArray(undefined, 'cbc:Note')).toBeUndefined();
  });
});
