/**
 * @description Unit tests for CEN-EN16931-BR-CO-16.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo16 } from './cen-en16931-br-co-16';

describe('CEN-EN16931-BR-CO-16', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo16(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.legalMonetaryTotal.payableAmount = { ...document.legalMonetaryTotal.payableAmount, value: 1 };
      const result = yield* validateCenEn16931BrCo16(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
