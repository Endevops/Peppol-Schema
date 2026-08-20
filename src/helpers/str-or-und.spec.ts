import { describe, expect, it } from 'vitest';

import { strOrUnd } from './str-or-und';

describe('strOrUnd', () => {
  it('returns the string for a primitive value', () => {
    expect(strOrUnd({ 'cbc:ID': 'abc' }, 'cbc:ID')).toBe('abc');
    expect(strOrUnd({ 'cbc:ID': 42 }, 'cbc:ID')).toBe('42');
  });

  it('returns the text content of an object value with #text', () => {
    expect(strOrUnd({ 'cbc:ID': { '#text': 'abc' } }, 'cbc:ID')).toBe('abc');
  });

  it('returns undefined for an object value where #text is undefined', () => {
    expect(strOrUnd({ 'cbc:ID': { '#text': undefined } }, 'cbc:ID')).toBeUndefined();
    expect(strOrUnd({ 'cbc:ID': { other: 'x' } }, 'cbc:ID')).toBeUndefined();
  });

  it('returns undefined when the value is missing', () => {
    expect(strOrUnd({}, 'cbc:ID')).toBeUndefined();
  });

  it('returns undefined when the value is null', () => {
    expect(strOrUnd({ 'cbc:ID': null }, 'cbc:ID')).toBeUndefined();
  });

  it('returns undefined when the node is undefined', () => {
    expect(strOrUnd(undefined, 'cbc:ID')).toBeUndefined();
  });

  it('returns the value directly (no path) for a node', () => {
    expect(strOrUnd('abc')).toBe('abc');
    expect(strOrUnd({ '#text': 'xyz' })).toBe('xyz');
  });
});
