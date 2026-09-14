/**
 * @description Unit tests for NL-R-004 (Dutch customer address).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR004 } from './nl-r-004';

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
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: supplierVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: supplierCountry } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: customerVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: customerCountry } },
    },
  } as unknown as PeppolDocument;
}

describe('NL-R-004 (Dutch customer address)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateNlR004(document);
    })
  );

  it.effect(
    'fails when Dutch parties and the customer has no street',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withCountry(await decodeBaseExample(), 'NL', 'NL'));
      const altered = {
        ...document,
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          postalAddress: { ...document.accountingCustomerParty.postalAddress, streetName: undefined },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateNlR004(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
