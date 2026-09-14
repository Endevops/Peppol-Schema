/**
 * @description Unit tests for CEN-EN16931-BR-31.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931Br31 } from './cen-en16931-br-31.ts';

describe('CEN-EN16931-BR-31', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br31(document);
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
          amount: undefined,
          baseAmount: undefined,
          chargeIndicator: false,
          taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
        },
      ];
      const result = yield* validateCenEn16931Br31(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
