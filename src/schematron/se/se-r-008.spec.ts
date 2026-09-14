/**
 * @description Unit tests for SE-R-008 (Bankgiro account numeric).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateSeR008 } from './se-r-008.ts';

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

describe('SE-R-008 (Bankgiro account numeric)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateSeR008(document);
    })
  );

  it.effect(
    'fails when a Swedish Bankgiro account is not numeric',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [
          { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: 'ABC123', financialInstitutionBranch: { id: 'SE:BANKGIRO' } } },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validateSeR008(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
