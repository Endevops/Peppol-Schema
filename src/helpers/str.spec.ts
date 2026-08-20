import { describe, expect, it } from 'vitest';

import { str } from './str';

describe('str', () => {
  it('returns the string value', () => {
    expect(str({ 'cbc:ID': '50' }, 'cbc:ID')).toBe('50');
  });

  it('throws when the value is undefined', () => {
    expect(() => str({}, 'cbc:ID')).toThrow('Invalid node');
  });

  it('throws when the value is null', () => {
    expect(() => str({ 'cbc:ID': null }, 'cbc:ID')).toThrow('Invalid node');
  });

  it('throws when the value is an object without #text', () => {
    expect(() => str({ 'cbc:ID': { other: 'x' } }, 'cbc:ID')).toThrow('Invalid node');
  });

  it('throws when the node is undefined', () => {
    expect(() => str(undefined, 'cbc:ID')).toThrow('Invalid node');
  });

  it('reads the #text of an object value', () => {
    expect(str({ 'cbc:ID': { '#text': '50' } }, 'cbc:ID')).toBe('50');
  });
});
