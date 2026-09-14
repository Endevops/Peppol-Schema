import { assert, describe, expect, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { str } from './str.ts';

describe('str', () => {
  it.effect(
    'returns the string value',
    Effect.fn(function* () {
      expect(yield* str({ 'cbc:ID': '50' }, 'cbc:ID')).toBe('50');
    })
  );

  it.effect(
    'throws when the value is undefined',
    Effect.fn(function* () {
      const result = yield* str({}, 'cbc:ID').pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'throws when the value is null',
    Effect.fn(function* () {
      const result = yield* str({ 'cbc:ID': null }, 'cbc:ID').pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'throws when the value is an object without #text',
    Effect.fn(function* () {
      const result = yield* str({ 'cbc:ID': { other: 'x' } }, 'cbc:ID').pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'throws when the node is undefined',
    Effect.fn(function* () {
      const result = yield* str(undefined, 'cbc:ID').pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'reads the #text of an object value',
    Effect.fn(function* () {
      expect(yield* str({ 'cbc:ID': { '#text': '50' } }, 'cbc:ID')).toBe('50');
    })
  );
});
