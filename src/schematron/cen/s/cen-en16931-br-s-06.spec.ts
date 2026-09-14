/**
 * @description Unit tests for CEN-EN16931-BR-S-06.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrS06 } from './cen-en16931-br-s-06';

describe('CEN-EN16931-BR-S-06', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrS06(document);
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
          chargeIndicator: false,
          taxCategory: { id: 'S', percent: 0, taxSchemeId: { id: 'VAT' } },
        },
      ];
      const result = yield* validateCenEn16931BrS06(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
