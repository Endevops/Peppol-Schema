/**
 * @description Unit tests for CEN-EN16931-BR-CO-17.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrCo17 } from './cen-en16931-br-co-17.ts';

describe('CEN-EN16931-BR-CO-17', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo17(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals[0].taxSubtotals[0].taxAmount = { ...document.taxTotals[0].taxSubtotals[0].taxAmount, value: 1 };
      const result = yield* validateCenEn16931BrCo17(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
