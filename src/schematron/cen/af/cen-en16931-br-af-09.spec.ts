/**
 * @description Unit tests for CEN-EN16931-BR-AF-09.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrAf09 } from './cen-en16931-br-af-09.ts';

describe('CEN-EN16931-BR-AF-09', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrAf09(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals = [
        {
          taxAmount: { currencyId: 'EUR', value: 1 },
          taxSubtotals: [
            {
              taxAmount: { currencyId: 'EUR', value: 1 },
              taxableAmount: { currencyId: 'EUR', value: 100 },
              taxCategory: { id: 'L', percent: 0, taxExemptionReason: undefined, taxExemptionReasonCode: undefined, taxSchemeId: { id: 'VAT' } },
            },
          ],
        },
      ];
      const result = yield* validateCenEn16931BrAf09(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
