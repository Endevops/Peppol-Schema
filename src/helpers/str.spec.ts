import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { str } from './str';

describe('str', () => {
  it('returns the string value', () => {
    expect(Effect.runSync(str({ 'cbc:ID': '50' }, 'cbc:ID'))).toBe('50');
  });

  it('throws when the value is undefined', () => {
    expect(() => Effect.runSync(str({}, 'cbc:ID'))).toThrow('Invalid node');
  });

  it('throws when the value is null', () => {
    expect(() => Effect.runSync(str({ 'cbc:ID': null }, 'cbc:ID'))).toThrow('Invalid node');
  });

  it('throws when the value is an object without #text', () => {
    expect(() => Effect.runSync(str({ 'cbc:ID': { other: 'x' } }, 'cbc:ID'))).toThrow('Invalid node');
  });

  it('throws when the node is undefined', () => {
    expect(() => Effect.runSync(str(undefined, 'cbc:ID'))).toThrow('Invalid node');
  });

  it('reads the #text of an object value', () => {
    expect(Effect.runSync(str({ 'cbc:ID': { '#text': '50' } }, 'cbc:ID'))).toBe('50');
  });
});
