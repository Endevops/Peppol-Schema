/**
 * @description Unit tests for CEN-EN16931-BR-AE-08.
 */
import { assert, describe, expect, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrAe08 } from './cen-en16931-br-ae-08.ts';

describe('CEN-EN16931-BR-AE-08', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrAe08(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].item.classifiedTaxCategory.id = 'AE';
      document.taxTotals = [
        {
          taxAmount: { currencyId: 'EUR', value: 0 },
          taxSubtotals: [
            {
              taxAmount: { currencyId: 'EUR', value: 0 },
              taxableAmount: { currencyId: 'EUR', value: 50 },
              taxCategory: { id: 'AE', percent: 0, taxExemptionReason: undefined, taxExemptionReasonCode: undefined, taxSchemeId: { id: 'VAT' } },
            },
          ],
        },
      ];
      const result = yield* validateCenEn16931BrAe08(document).pipe(Effect.result);
      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        assert(result.failure.fields.length > 0);
        expect(result.failure.fields).toEqual([
          { path: 'taxTotals[0].taxSubtotals[0].taxableAmount.value', expected: 2800, actual: 50 },
          { path: 'invoiceLines[0].lineExtensionAmount.value', expected: null, actual: 2800 },
        ]);
      }
    })
  );
});
