/**
 * @description Unit tests for CEN-EN16931-BR-CO-24.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo24 } from './cen-en16931-br-co-24';

describe('CEN-EN16931-BR-CO-24', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo24(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].allowanceCharges = [
        {
          allowanceChargeReason: undefined,
          allowanceChargeReasonCode: undefined,
          amount: { currencyId: 'EUR', value: 5 },
          baseAmount: undefined,
          chargeIndicator: true,
        },
      ];
      const result = yield* validateCenEn16931BrCo24(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
