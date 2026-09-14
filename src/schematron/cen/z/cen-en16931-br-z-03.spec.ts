/**
 * @description Unit tests for CEN-EN16931-BR-Z-03.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrZ03 } from './cen-en16931-br-z-03';

describe('CEN-EN16931-BR-Z-03', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrZ03(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.allowanceCharges = [
        {
          allowanceChargeReason: undefined,
          allowanceChargeReasonCode: undefined,
          amount: { currencyId: 'EUR', value: 10 },
          baseAmount: undefined,
          chargeIndicator: false,
          taxCategory: { id: 'Z', percent: 0, taxSchemeId: { id: 'VAT' } },
        },
      ];
      document.accountingSupplierParty.partyTaxSchemes = undefined;
      document.taxRepresentativeParty = undefined;
      const result = yield* validateCenEn16931BrZ03(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
