/**
 * @description Unit tests for CEN-EN16931-BR-DEC-02.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec02 } from './cen-en16931-br-dec-02';

describe('CEN-EN16931-BR-DEC-02', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrDec02(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.allowanceCharges = [
        {
          allowanceChargeReason: undefined,
          allowanceChargeReasonCode: undefined,
          amount: { currencyId: 'EUR', value: 10 },
          baseAmount: { currencyId: 'EUR', value: 1.234 },
          chargeIndicator: false,
          taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
        },
      ];
      const result = yield* validateCenEn16931BrDec02(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
