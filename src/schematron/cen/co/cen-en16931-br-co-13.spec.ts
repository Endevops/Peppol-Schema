/**
 * @description Unit tests for CEN-EN16931-BR-CO-13.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrCo13 } from './cen-en16931-br-co-13.ts';

describe('CEN-EN16931-BR-CO-13', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo13(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.legalMonetaryTotal.taxExclusiveAmount = { ...document.legalMonetaryTotal.taxExclusiveAmount, value: 1 };
      const result = yield* validateCenEn16931BrCo13(document).pipe(Effect.result);
      assert(Result.isFailure(result));
      assert(result.failure.fields.length > 0);
      assert.deepStrictEqual(result.failure.fields, [
        { path: 'legalMonetaryTotal.taxExclusiveAmount.value', expected: 1325, actual: 1 },
        { path: 'legalMonetaryTotal.lineExtensionAmount.value', expected: null, actual: 1300 },
        { path: 'legalMonetaryTotal.chargeTotalAmount.value', expected: null, actual: 25 },
        { path: 'legalMonetaryTotal.allowanceTotalAmount.value', expected: null, actual: null },
      ]);
    })
  );
});
