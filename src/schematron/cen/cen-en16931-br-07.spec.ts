/**
 * @description Unit tests for CEN-EN16931-BR-07.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931Br07 } from './cen-en16931-br-07.ts';

describe('CEN-EN16931-BR-07', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br07(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.accountingCustomerParty.partyLegalEntity.registrationName = '';
      const result = yield* validateCenEn16931Br07(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
