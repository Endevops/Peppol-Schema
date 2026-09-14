/**
 * @description Unit tests for CEN-EN16931-BR-CO-26.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo26 } from './cen-en16931-br-co-26';

describe('CEN-EN16931-BR-CO-26', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo26(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.accountingSupplierParty.partyTaxSchemes = undefined;
      document.accountingSupplierParty.partyIdentification = undefined;
      document.accountingSupplierParty.partyLegalEntity.companyId = undefined;
      const result = yield* validateCenEn16931BrCo26(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
