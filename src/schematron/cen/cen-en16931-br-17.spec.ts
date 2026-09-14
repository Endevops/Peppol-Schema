/**
 * @description Unit tests for CEN-EN16931-BR-17.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br17 } from './cen-en16931-br-17';

describe('CEN-EN16931-BR-17', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br17(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.payeeParty = {
        partyName: { name: document.accountingSupplierParty.partyLegalEntity.registrationName },
        partyIdentification: undefined,
        partyLegalEntity: undefined,
      };
      const result = yield* validateCenEn16931Br17(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
