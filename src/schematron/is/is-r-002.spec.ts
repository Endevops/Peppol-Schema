/**
 * @description Unit tests for IS-R-002 (Icelandic seller legal id).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateIsR002 } from './is-r-002.ts';

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

describe('IS-R-002 (Icelandic seller legal id)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateIsR002(document);
    })
  );

  it.effect(
    'fails when an Icelandic supplier has no legal id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withCountry(await decodeBaseExample(), 'IS', 'BE'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          party: {
            ...document.accountingSupplierParty.party,
            partyLegalEntity: { ...document.accountingSupplierParty.party.partyLegalEntity, companyId: undefined },
          },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateIsR002(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when an Icelandic supplier has a legal id with scheme 0196',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withCountry(await decodeBaseExample(), 'IS', 'BE'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          party: {
            ...document.accountingSupplierParty.party,
            partyLegalEntity: { ...document.accountingSupplierParty.party.partyLegalEntity, companyId: { id: '1234567890', schemeId: '0196' } },
          },
        },
      } as unknown as PeppolDocument;
      yield* validateIsR002(altered);
    })
  );
});
