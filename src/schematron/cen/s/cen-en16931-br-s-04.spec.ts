/**
 * @description Unit tests for CEN-EN16931-BR-S-04.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrS04 } from './cen-en16931-br-s-04';

describe('CEN-EN16931-BR-S-04', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrS04(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.accountingSupplierParty.partyTaxSchemes = undefined;
      document.taxRepresentativeParty = undefined;
      const result = yield* validateCenEn16931BrS04(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
