/**
 * @description Unit tests for CEN-EN16931-BR-57.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931Br57 } from './cen-en16931-br-57.ts';

describe('CEN-EN16931-BR-57', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br57(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.delivery.deliveryLocation.address.countryCode.identificationCode = '';
      const result = yield* validateCenEn16931Br57(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
