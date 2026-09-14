/**
 * @description Unit tests for NL-R-007 (payment means required when payment flows to supplier).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateNlR007 } from './nl-r-007.ts';

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

describe('NL-R-007 (payment means required when payment flows to supplier)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateNlR007(document);
    })
  );

  it.effect(
    'fails when a Dutch document has a positive payable amount and no payment means',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDutch(await decodeBaseExample()));
      const altered = { ...document, paymentMeans: undefined } as unknown as PeppolDocument;
      const result = yield* validateNlR007(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Dutch document has a positive payable amount and payment means',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDutch(await decodeBaseExample()));
      yield* validateNlR007(document);
    })
  );
});
