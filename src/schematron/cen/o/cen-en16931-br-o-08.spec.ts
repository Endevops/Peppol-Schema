/**
 * @description Unit tests for CEN-EN16931-BR-O-08.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrO08 } from './cen-en16931-br-o-08';

describe('CEN-EN16931-BR-O-08', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrO08(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].item.classifiedTaxCategory.id = 'O';
      document.taxTotals = [
        {
          taxAmount: { currencyId: 'EUR', value: 0 },
          taxSubtotals: [
            {
              taxAmount: { currencyId: 'EUR', value: 0 },
              taxableAmount: { currencyId: 'EUR', value: 50 },
              taxCategory: { id: 'O', percent: 0, taxExemptionReason: undefined, taxExemptionReasonCode: undefined, taxSchemeId: { id: 'VAT' } },
            },
          ],
        },
      ];
      const result = yield* validateCenEn16931BrO08(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
