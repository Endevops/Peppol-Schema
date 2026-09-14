/**
 * @description Unit tests for SE-R-010 (Plusgiro account length).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR010 } from './se-r-010';

async function asSwedish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'SE' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'SE' } },
    },
  } as unknown as PeppolDocument;
}

describe('SE-R-010 (Plusgiro account length)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateSeR010(document);
    })
  );

  it.effect(
    'fails when a Swedish Plusgiro account is too long',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [
          { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: '123456789', financialInstitutionBranch: { id: 'SE:PLUSGIRO' } } },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validateSeR010(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Swedish Plusgiro account has a valid length',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [
          { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: '12345678', financialInstitutionBranch: { id: 'SE:PLUSGIRO' } } },
        ],
      } as unknown as PeppolDocument;
      yield* validateSeR010(altered);
    })
  );
});
