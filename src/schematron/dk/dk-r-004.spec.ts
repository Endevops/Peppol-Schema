/**
 * @description Unit tests for DK-R-004 (ZZZ allowance reason).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDkR004 } from './dk-r-004.ts';

async function asDanish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'DK12345678', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'DK87654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
  } as unknown as PeppolDocument;
}

describe('DK-R-004 (ZZZ allowance reason)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDkR004(document);
    })
  );

  it.effect(
    'fails when a Danish document uses reason code ZZZ with an invalid reason',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const altered = {
        ...document,
        allowanceCharges: [
          { amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: false, allowanceChargeReasonCode: 'ZZZ', allowanceChargeReason: 'bad reason' },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validateDkR004(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Danish document uses reason code ZZZ with a 4-digit reason',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const altered = {
        ...document,
        allowanceCharges: [
          { amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: false, allowanceChargeReasonCode: 'ZZZ', allowanceChargeReason: '1234' },
        ],
      } as unknown as PeppolDocument;
      yield* validateDkR004(altered);
    })
  );
});
