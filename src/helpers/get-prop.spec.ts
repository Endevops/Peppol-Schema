import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { getProp } from '#/helpers/get-prop';

describe('getProps', () => {
  it.effect.each([undefined, null, false, 0, ''])(
    'should return undefined for an undefined node (%s)',
    Effect.fn(function* (node) {
      const prop = yield* getProp(node, 'content');
      expect(prop).toBeUndefined();
    })
  );

  it.effect(
    'should return the node when no property are passed',
    Effect.fn(function* () {
      const node = {};
      const prop = yield* getProp(node);
      expect(prop).toEqual(node);
    })
  );

  it.effect.each([undefined, null])(
    'should return undefined if the value is nullis',
    Effect.fn(function* (value) {
      const prop = yield* getProp({ content: value }, 'cac:content');
      expect(prop).toEqual(undefined);
    })
  );

  it.effect(
    'should return undefined of a missing property',
    Effect.fn(function* () {
      const prop = yield* getProp({}, 'content');
      expect(prop).toBeUndefined();
    })
  );

  it.effect(
    'should return the value of a property',
    Effect.fn(function* () {
      const prop = yield* getProp({ content: 'value' }, 'content');
      expect(prop).toEqual('value');
    })
  );

  it.effect(
    'should return the value of a property based on its fallback (property with :)',
    Effect.fn(function* () {
      const prop = yield* getProp({ content: 'value' }, 'cac:content');
      expect(prop).toEqual('value');
    })
  );
});
