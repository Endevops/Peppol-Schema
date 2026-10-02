/**
 * @description Unit tests for NL-R-003 (Dutch legal entity identifier scheme).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateNlR003 } from './nl-r-003.ts';

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

describe('NL-R-003 (Dutch legal entity identifier scheme)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateNlR003(document);
    })
  );

  it.effect(
    'fails when a Dutch supplier legal entity uses a wrong scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withCountry(await decodeBaseExample(), 'NL', 'BE'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          party: {
            ...document.accountingSupplierParty.party,
            partyLegalEntity: { ...document.accountingSupplierParty.party.partyLegalEntity, companyId: { id: '12345678', schemeId: '0196' } },
          },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateNlR003(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Dutch supplier legal entity uses scheme 0106',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withCountry(await decodeBaseExample(), 'NL', 'BE'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          party: {
            ...document.accountingSupplierParty.party,
            partyLegalEntity: { ...document.accountingSupplierParty.party.partyLegalEntity, companyId: { id: '12345678', schemeId: '0106' } },
          },
        },
      } as unknown as PeppolDocument;
      yield* validateNlR003(altered);
    })
  );
});
