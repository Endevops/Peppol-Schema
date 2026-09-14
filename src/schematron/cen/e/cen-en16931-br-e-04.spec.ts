/**
 * @description Unit tests for CEN-EN16931-BR-E-04.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrE04 } from './cen-en16931-br-e-04.ts';

describe('CEN-EN16931-BR-E-04', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrE04(document);
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
          chargeIndicator: true,
          taxCategory: { id: 'E', percent: 0, taxSchemeId: { id: 'VAT' } },
        },
      ];
      document.accountingSupplierParty.partyTaxSchemes = undefined;
      document.taxRepresentativeParty = undefined;
      const result = yield* validateCenEn16931BrE04(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
