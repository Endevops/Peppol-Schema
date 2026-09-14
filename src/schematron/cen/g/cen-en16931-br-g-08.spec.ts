/**
 * @description Unit tests for CEN-EN16931-BR-G-08.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrG08 } from './cen-en16931-br-g-08';

describe('CEN-EN16931-BR-G-08', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrG08(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].item.classifiedTaxCategory.id = 'G';
      document.taxTotals = [
        {
          taxAmount: { currencyId: 'EUR', value: 0 },
          taxSubtotals: [
            {
              taxAmount: { currencyId: 'EUR', value: 0 },
              taxableAmount: { currencyId: 'EUR', value: 50 },
              taxCategory: { id: 'G', percent: 0, taxExemptionReason: undefined, taxExemptionReasonCode: undefined, taxSchemeId: { id: 'VAT' } },
            },
          ],
        },
      ];
      const result = yield* validateCenEn16931BrG08(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
