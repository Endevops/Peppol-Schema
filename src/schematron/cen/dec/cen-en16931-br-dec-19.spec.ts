/**
 * @description Unit tests for CEN-EN16931-BR-DEC-19.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec19 } from './cen-en16931-br-dec-19';

describe('CEN-EN16931-BR-DEC-19', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrDec19(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals[0].taxSubtotals[0].taxableAmount = { ...document.taxTotals[0].taxSubtotals[0].taxableAmount, value: 1.234 };
      const result = yield* validateCenEn16931BrDec19(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
