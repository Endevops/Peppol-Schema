/**
 * @description Unit tests for CEN-EN16931-BR-20.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br20 } from './cen-en16931-br-20';

describe('CEN-EN16931-BR-20', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br20(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxRepresentativeParty = {
        name: 'Rep',
        postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: '' } },
        partyTaxScheme: { companyId: 'FR123', taxSchemeId: { id: 'VAT' } },
      };
      const result = yield* validateCenEn16931Br20(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
