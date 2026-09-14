/**
 * @description Unit tests for CEN-EN16931-BR-S-08.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrS08 } from './cen-en16931-br-s-08.ts';

describe('CEN-EN16931-BR-S-08', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrS08(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals[0].taxSubtotals[0].taxableAmount = { ...document.taxTotals[0].taxSubtotals[0].taxableAmount, value: 50 };
      const result = yield* validateCenEn16931BrS08(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
