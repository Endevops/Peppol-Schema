/**
 * @description Unit tests for NL-R-006 (Dutch tax representative address).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR006 } from './nl-r-006';

async function asDutch(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'NL123456789', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'NL' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'NL987654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'NL' } },
    },
  } as unknown as PeppolDocument;
}

describe('NL-R-006 (Dutch tax representative address)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateNlR006(document);
    })
  );

  it.effect(
    'fails when a Dutch document has a Dutch tax representative without a post code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDutch(await decodeBaseExample()));
      const altered = {
        ...document,
        taxRepresentativeParty: {
          name: 'Tax Rep',
          partyTaxScheme: { companyId: 'NL123', taxSchemeId: { id: 'VAT' } },
          postalAddress: { streetName: 'Street 1', cityName: 'Amsterdam', postalZone: undefined, countryCode: { identificationCode: 'NL' } },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateNlR006(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
