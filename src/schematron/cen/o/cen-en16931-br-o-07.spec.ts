/**
 * @description Unit tests for CEN-EN16931-BR-O-07.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrO07 } from './cen-en16931-br-o-07';

describe('CEN-EN16931-BR-O-07', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrO07(document);
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
          baseAmount: undefined,
          chargeIndicator: true,
          taxCategory: { id: 'O', percent: 21, taxSchemeId: { id: 'VAT' } },
        },
      ];
      const result = yield* validateCenEn16931BrO07(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
