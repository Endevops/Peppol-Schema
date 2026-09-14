/**
 * @description Unit tests for CEN-EN16931-BR-O-12.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrO12 } from './cen-en16931-br-o-12.ts';

describe('CEN-EN16931-BR-O-12', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrO12(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals[0].taxSubtotals[0].taxCategory = { ...document.taxTotals[0].taxSubtotals[0].taxCategory, id: 'O', percent: undefined };
      const result = yield* validateCenEn16931BrO12(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
