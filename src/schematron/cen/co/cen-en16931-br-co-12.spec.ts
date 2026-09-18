/**
 * @description Unit tests for CEN-EN16931-BR-CO-12.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrCo12 } from './cen-en16931-br-co-12.ts';

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
      assert(result.failure.fields.length > 0);
      assert.deepStrictEqual(result.failure.fields, [
        { path: 'legalMonetaryTotal.chargeTotalAmount.value', expected: 25, actual: 5 },
        { path: 'allowanceCharges[0].amount.value', expected: null, actual: 25 },
      ]);
    })
  );

  it.effect(
    'fails when a zero-amount charge is present without a charge total',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.legalMonetaryTotal.chargeTotalAmount = undefined;
      document.allowanceCharges = [
        { amount: { currencyId: 'EUR', value: 0 }, chargeIndicator: true, taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } } },
      ];
      const result = yield* validateCenEn16931BrCo12(document).pipe(Effect.result);
      assert(Result.isFailure(result));
      assert(result.failure.fields.length > 0);
      assert.deepStrictEqual(result.failure.fields, [
        { path: 'legalMonetaryTotal.chargeTotalAmount.value', expected: 0, actual: null },
        { path: 'allowanceCharges[0].amount.value', expected: null, actual: 0 },
      ]);
    })
  );
});
