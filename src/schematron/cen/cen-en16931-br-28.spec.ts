/**
 * @description Unit tests for CEN-EN16931-BR-28.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br28 } from './cen-en16931-br-28';

describe('CEN-EN16931-BR-28', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br28(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].price.allowanceCharge = {
        amount: { currencyId: 'EUR', value: 5 },
        baseAmount: { currencyId: 'EUR', value: -1 },
        chargeIndicator: false,
      };
      const result = yield* validateCenEn16931Br28(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
