/**
 * @description Unit tests for IS-R-003 (Icelandic seller address).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateIsR003 } from './is-r-003.ts';

async function withCountry(
  document: PeppolDocument,
  supplierCountry: string,
  customerCountry: string,
  supplierVatPrefix = `${supplierCountry}VAT123456789`,
  customerVatPrefix = `${customerCountry}VAT123456789`
): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      party: {
        ...document.accountingSupplierParty.party,
        partyTaxSchemes: [{ companyId: supplierVatPrefix, taxSchemeId: { id: 'VAT' } }],
        postalAddress: { ...document.accountingSupplierParty.party.postalAddress, countryCode: { identificationCode: supplierCountry } },
      },
    },
    accountingCustomerParty: {
      party: {
        ...document.accountingCustomerParty.party,
        partyTaxSchemes: [{ companyId: customerVatPrefix, taxSchemeId: { id: 'VAT' } }],
        postalAddress: { ...document.accountingCustomerParty.party.postalAddress, countryCode: { identificationCode: customerCountry } },
      },
    },
  } as unknown as PeppolDocument;
}

describe('IS-R-003 (Icelandic seller address)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateIsR003(document);
    })
  );

  it.effect(
    'fails when an Icelandic supplier has no post code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withCountry(await decodeBaseExample(), 'IS', 'BE'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          party: {
            ...document.accountingSupplierParty.party,
            postalAddress: { ...document.accountingSupplierParty.party.postalAddress, postalZone: undefined },
          },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateIsR003(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
