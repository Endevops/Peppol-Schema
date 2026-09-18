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
      assert(result.failure.fields.length > 0);
      assert.deepStrictEqual(result.failure.fields, [
        { path: 'taxTotals[0].taxSubtotals[0].taxAmount.value', expected: 331.25, actual: 1 },
        { path: 'taxTotals[0].taxSubtotals[0].taxableAmount.value', expected: null, actual: 1325 },
        { path: 'taxTotals[0].taxSubtotals[0].taxCategory.percent', expected: null, actual: 25 },
      ]);
    })
  );

  it.effect(
    'reports both failing subtotals in a single rule error',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals = [
        {
          taxAmount: { currencyId: 'EUR', value: 3 },
          taxSubtotals: [
            {
              taxAmount: { currencyId: 'EUR', value: 1 },
              taxableAmount: { currencyId: 'EUR', value: 1325 },
              taxCategory: { id: 'S', percent: 25, taxExemptionReason: undefined, taxExemptionReasonCode: undefined, taxSchemeId: { id: 'VAT' } },
            },
            {
              taxAmount: { currencyId: 'EUR', value: 2 },
              taxableAmount: { currencyId: 'EUR', value: 100 },
              taxCategory: { id: 'S', percent: 25, taxExemptionReason: undefined, taxExemptionReasonCode: undefined, taxSchemeId: { id: 'VAT' } },
            },
          ],
        },
      ];
      const result = yield* validateCenEn16931BrCo17(document).pipe(Effect.result);
      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        assert.deepStrictEqual(result.failure.fields, [
          { path: 'taxTotals[0].taxSubtotals[0].taxAmount.value', expected: 331.25, actual: 1 },
          { path: 'taxTotals[0].taxSubtotals[0].taxableAmount.value', expected: null, actual: 1325 },
          { path: 'taxTotals[0].taxSubtotals[0].taxCategory.percent', expected: null, actual: 25 },
          { path: 'taxTotals[0].taxSubtotals[1].taxAmount.value', expected: 25, actual: 2 },
          { path: 'taxTotals[0].taxSubtotals[1].taxableAmount.value', expected: null, actual: 100 },
          { path: 'taxTotals[0].taxSubtotals[1].taxCategory.percent', expected: null, actual: 25 },
        ]);
      }
    })
  );
});
