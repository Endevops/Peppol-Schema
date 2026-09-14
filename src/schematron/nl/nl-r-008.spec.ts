/**
 * @description Unit tests for NL-R-008 (allowed payment means codes).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateNlR008 } from './nl-r-008.ts';

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

describe('NL-R-008 (allowed payment means codes)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateNlR008(document);
    })
  );

  it.effect(
    'fails when both parties are Dutch and an unsupported payment means code is used',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDutch(await decodeBaseExample()));
      const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '99' } }] } as unknown as PeppolDocument;
      const result = yield* validateNlR008(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when both parties are Dutch and a supported payment means code is used',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDutch(await decodeBaseExample()));
      const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '30' } }] } as unknown as PeppolDocument;
      yield* validateNlR008(altered);
    })
  );
});
