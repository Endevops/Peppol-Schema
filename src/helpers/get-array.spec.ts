import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { getArray } from './get-array';

describe('getArray', () => {
  it('returns [] when the node is undefined', () => {
    expect(Effect.runSync(getArray(undefined, 'cac:Thing'))).toEqual([]);
  });

  it('returns [] when the node is null', () => {
    expect(Effect.runSync(getArray(null, 'cac:Thing'))).toEqual([]);
  });

  it('returns [] when the path is missing', () => {
    expect(Effect.runSync(getArray({}, 'cac:Thing'))).toEqual([]);
  });

  it('returns [] when an intermediate path segment is falsy', () => {
    expect(Effect.runSync(getArray({ 'cac:Thing': null }, 'cac:Thing', 'cbc:ID'))).toEqual([]);
    expect(Effect.runSync(getArray({ 'cac:Thing': undefined }, 'cac:Thing', 'cbc:ID'))).toEqual([]);
  });

  it('returns [value] for a single object node', () => {
    expect(Effect.runSync(getArray({ 'cac:Thing': { 'cbc:ID': '1' } }, 'cac:Thing'))).toEqual([{ 'cbc:ID': '1' }]);
  });

  it('returns the value as-is for an array node', () => {
    const items = [{ 'cbc:ID': '1' }, { 'cbc:ID': '2' }];
    expect(Effect.runSync(getArray({ 'cac:Thing': items }, 'cac:Thing'))).toEqual(items);
  });

  it('flattens nested arrays through path traversal', () => {
    const node = { 'cac:Thing': [{ 'cbc:ID': '1' }, { 'cbc:ID': '2' }] };
    expect(Effect.runSync(getArray(node, 'cac:Thing', 'cbc:ID'))).toEqual(['1', '2']);
  });

  it('flattens and drops items missing the final key', () => {
    const node = { 'cac:Thing': [{ 'cbc:ID': '1' }, { notAnId: true }, { undefined: true }, {}] };
    expect(Effect.runSync(getArray(node, 'cac:Thing', 'cbc:ID'))).toEqual(['1']);
  });

  it('returns [] when the final value is falsy', () => {
    expect(Effect.runSync(getArray({ 'cac:Thing': { 'cbc:ID': null } }, 'cac:Thing', 'cbc:ID'))).toEqual([]);
  });
});
