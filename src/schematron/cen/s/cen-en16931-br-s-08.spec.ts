/**
 * @description Unit tests for CEN-EN16931-BR-S-08.
 */
import { assert, describe, expect, it } from '@effect/vitest';
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
      if (Result.isFailure(result)) {
        assert(result.failure.fields.length > 0);
        expect(result.failure.fields).toEqual([
          { path: 'taxTotals[0].taxSubtotals[0].taxableAmount.value', expected: 1325, actual: 50 },
          { path: 'invoiceLines[0].lineExtensionAmount.value', expected: null, actual: 2800 },
          { path: 'invoiceLines[1].lineExtensionAmount.value', expected: null, actual: -1500 },
          { path: 'allowanceCharges[0].amount.value', expected: null, actual: 25 },
          { path: 'taxTotals[0].taxSubtotals[0].taxCategory.percent', expected: null, actual: 25 },
        ]);
      }
    })
  );

  it.effect(
    'reports the taxable amount then the missing rate',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals = [
        {
          taxAmount: { currencyId: 'EUR', value: 0 },
          taxSubtotals: [
            {
              taxAmount: { currencyId: 'EUR', value: 0 },
              taxableAmount: { currencyId: 'EUR', value: 50 },
              taxCategory: {
                id: 'S',
                percent: undefined,
                taxExemptionReason: undefined,
                taxExemptionReasonCode: undefined,
                taxSchemeId: { id: 'VAT' },
              },
            },
          ],
        },
      ];
      const result = yield* validateCenEn16931BrS08(document).pipe(Effect.result);
      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        expect(result.failure.fields).toEqual([
          { path: 'taxTotals[0].taxSubtotals[0].taxableAmount.value', expected: null, actual: 50 },
          { path: 'taxTotals[0].taxSubtotals[0].taxCategory.percent', expected: null, actual: null },
        ]);
      }
    })
  );
});
