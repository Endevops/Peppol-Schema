/**
 * @description Unit tests for CEN-EN16931-BR-CO-12.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo12 } from './cen-en16931-br-co-12';

describe('CEN-EN16931-BR-CO-12', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo12(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.legalMonetaryTotal.chargeTotalAmount = { ...document.legalMonetaryTotal.chargeTotalAmount, value: 5 };
      const result = yield* validateCenEn16931BrCo12(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
