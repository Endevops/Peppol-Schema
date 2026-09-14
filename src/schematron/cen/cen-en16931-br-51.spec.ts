/**
 * @description Unit tests for CEN-EN16931-BR-51.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br51 } from './cen-en16931-br-51';

describe('CEN-EN16931-BR-51', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br51(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.paymentMeans = [
        { ...document.paymentMeans[0], cardAccount: { holderName: 'Holder', networkId: 'VISA', primaryAccountNumberId: '1234567890123456' } },
      ];
      const result = yield* validateCenEn16931Br51(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
