/**
 * @description Unit tests for SE-R-009 (Bankgiro account length).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateSeR009 } from './se-r-009.ts';

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

describe('SE-R-009 (Bankgiro account length)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateSeR009(document);
    })
  );

  it.effect(
    'fails when a Swedish Bankgiro account has an invalid length',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: '123', financialInstitutionBranch: { id: 'SE:BANKGIRO' } } }],
      } as unknown as PeppolDocument;
      const result = yield* validateSeR009(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Swedish Bankgiro account has a valid length',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [
          { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: '1234567', financialInstitutionBranch: { id: 'SE:BANKGIRO' } } },
        ],
      } as unknown as PeppolDocument;
      yield* validateSeR009(altered);
    })
  );
});
