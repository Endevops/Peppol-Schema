/**
 * @description Unit tests for CEN-EN16931-BR-S-02.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrS02 } from './cen-en16931-br-s-02';

describe('CEN-EN16931-BR-S-02', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrS02(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.accountingSupplierParty.partyTaxSchemes = undefined;
      document.taxRepresentativeParty = undefined;
      const result = yield* validateCenEn16931BrS02(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
