/**
 * @description Unit tests for CEN-EN16931-BR-AE-02.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrAe02 } from './cen-en16931-br-ae-02.ts';

describe('CEN-EN16931-BR-AE-02', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrAe02(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].item.classifiedTaxCategory.id = 'AE';
      document.accountingSupplierParty.partyTaxSchemes = undefined;
      document.taxRepresentativeParty = undefined;
      document.accountingCustomerParty.partyTaxSchemes = undefined;
      document.accountingCustomerParty.partyLegalEntity.companyId = undefined;
      const result = yield* validateCenEn16931BrAe02(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
