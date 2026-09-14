/**
 * @description Unit tests for CEN-EN16931-BR-56.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931Br56 } from './cen-en16931-br-56.ts';

describe('CEN-EN16931-BR-56', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br56(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxRepresentativeParty = {
        name: 'Rep',
        postalAddress: document.accountingSupplierParty.postalAddress,
        partyTaxScheme: { companyId: '', taxSchemeId: { id: 'VAT' } },
      };
      const result = yield* validateCenEn16931Br56(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
