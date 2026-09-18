/**
 * @description Unit tests for CEN-EN16931-BR-CO-16.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrCo16 } from './cen-en16931-br-co-16.ts';

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
      assert(result.failure.fields.length > 0);
      assert.deepStrictEqual(result.failure.fields, [
        { path: 'legalMonetaryTotal.payableAmount.value', expected: 1656.25, actual: 1 },
        { path: 'legalMonetaryTotal.taxInclusiveAmount.value', expected: null, actual: 1656.25 },
        { path: 'legalMonetaryTotal.prepaidAmount.value', expected: null, actual: null },
        { path: 'legalMonetaryTotal.payableRoundingAmount.value', expected: null, actual: null },
      ]);
    })
  );
});
