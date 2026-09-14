/**
 * @description Unit tests for CEN-EN16931-BR-E-10.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrE10 } from './cen-en16931-br-e-10';

describe('CEN-EN16931-BR-E-10', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrE10(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals = [
        {
          taxAmount: { currencyId: 'EUR', value: 0 },
          taxSubtotals: [
            {
              taxAmount: { currencyId: 'EUR', value: 0 },
              taxableAmount: { currencyId: 'EUR', value: 100 },
              taxCategory: { id: 'E', percent: 0, taxExemptionReason: undefined, taxExemptionReasonCode: undefined, taxSchemeId: { id: 'VAT' } },
            },
          ],
        },
      ];
      const result = yield* validateCenEn16931BrE10(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
