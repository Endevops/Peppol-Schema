import { assert, describe, expect, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { bool } from './bool';

describe('bool', () => {
  it.effect.each([true, false])(
    'returns the value when it is a boolean (%s)',
    Effect.fn(function* (value) {
      expect(yield* bool({ flag: value }, 'flag')).toBe(value);
    })
  );

  it.effect(
    'returns the text content when the value is an object with #text',
    Effect.fn(function* () {
      expect(yield* bool({ flag: { '#text': 'true' } }, 'flag')).toBe('true');
    })
  );

  it.effect(
    'throws when #text is undefined',
    Effect.fn(function* () {
      const result = yield* bool({ flag: { '#text': undefined } }, 'flag').pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'throws when the value is an object without #text',
    Effect.fn(function* () {
      const result = yield* bool({ flag: { other: 'x' } }, 'flag').pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'throws when the value is a non-boolean primitive',
    Effect.fn(function* () {
      const result = yield* bool({ flag: 'true' }, 'flag').pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'throws when the value is missing',
    Effect.fn(function* () {
      const result = yield* bool({}, 'flag').pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'throws when the node is undefined',
    Effect.fn(function* () {
      const result = yield* bool(undefined, 'flag').pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'walks nested paths',
    Effect.fn(function* () {
      expect(yield* bool({ 'cac:Party': { '@notifyingParty': false } }, 'cac:Party', '@notifyingParty')).toBe(false);
    })
  );
});
