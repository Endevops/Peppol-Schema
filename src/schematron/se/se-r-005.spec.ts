/**
 * @description Unit tests for SE-R-005 (seller tax registration identifier).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR005 } from './se-r-005';

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

describe('SE-R-005 (seller tax registration identifier)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateSeR005(document);
    })
  );

  it.effect(
    'fails when a Swedish supplier tax registration identifier is not F-skatt',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyTaxSchemes: [
            { companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } },
            { companyId: 'SomethingElse', taxSchemeId: { id: 'TAX' } },
          ],
        },
      } as unknown as PeppolDocument;
      const result = yield* validateSeR005(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Swedish supplier tax registration identifier is F-skatt',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyTaxSchemes: [
            { companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } },
            { companyId: 'GODKÄND FÖR F-SKATT', taxSchemeId: { id: 'TAX' } },
          ],
        },
      } as unknown as PeppolDocument;
      yield* validateSeR005(altered);
    })
  );
});
