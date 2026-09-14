/**
 * @description Unit tests for CEN-EN16931-BR-45.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br45 } from './cen-en16931-br-45';

describe('CEN-EN16931-BR-45', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br45(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals[0].taxSubtotals[0].taxableAmount = undefined;
      const result = yield* validateCenEn16931Br45(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
