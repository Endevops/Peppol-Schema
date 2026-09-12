import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { strOrUnd } from './str-or-und';

describe('strOrUnd', () => {
  it('returns the string for a primitive value', () => {
    expect(Effect.runSync(strOrUnd({ 'cbc:ID': 'abc' }, 'cbc:ID'))).toBe('abc');
    expect(Effect.runSync(strOrUnd({ 'cbc:ID': 42 }, 'cbc:ID'))).toBe('42');
  });

  it('returns the text content of an object value with #text', () => {
    expect(Effect.runSync(strOrUnd({ 'cbc:ID': { '#text': 'abc' } }, 'cbc:ID'))).toBe('abc');
  });

  it('returns undefined for an object value where #text is undefined', () => {
    expect(Effect.runSync(strOrUnd({ 'cbc:ID': { '#text': undefined } }, 'cbc:ID'))).toBeUndefined();
    expect(Effect.runSync(strOrUnd({ 'cbc:ID': { other: 'x' } }, 'cbc:ID'))).toBeUndefined();
  });

  it('returns undefined when the value is missing', () => {
    expect(Effect.runSync(strOrUnd({}, 'cbc:ID'))).toBeUndefined();
  });

  it('returns undefined when the value is null', () => {
    expect(Effect.runSync(strOrUnd({ 'cbc:ID': null }, 'cbc:ID'))).toBeUndefined();
  });

  it('returns undefined when the node is undefined', () => {
    expect(Effect.runSync(strOrUnd(undefined, 'cbc:ID'))).toBeUndefined();
  });

  it('returns the value directly (no path) for a node', () => {
    expect(Effect.runSync(strOrUnd('abc'))).toBe('abc');
    expect(Effect.runSync(strOrUnd({ '#text': 'xyz' }))).toBe('xyz');
  });
});
