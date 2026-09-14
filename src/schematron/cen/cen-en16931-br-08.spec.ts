/**
 * @description Unit tests for CEN-EN16931-BR-08.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931Br08 } from './cen-en16931-br-08.ts';

describe('CEN-EN16931-BR-08', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br08(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.accountingSupplierParty.postalAddress = undefined;
      const result = yield* validateCenEn16931Br08(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
