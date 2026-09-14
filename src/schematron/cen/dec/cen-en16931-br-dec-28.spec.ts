/**
 * @description Unit tests for CEN-EN16931-BR-DEC-28.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrDec28 } from './cen-en16931-br-dec-28.ts';

describe('CEN-EN16931-BR-DEC-28', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrDec28(document);
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
          baseAmount: { currencyId: 'EUR', value: 1.234 },
          chargeIndicator: true,
        },
      ];
      const result = yield* validateCenEn16931BrDec28(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
