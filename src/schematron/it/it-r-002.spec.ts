/**
 * @description Unit tests for IT-R-002 (Italian supplier address).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateItR002 } from './it-r-002';

async function withSupplierCountry(document: PeppolDocument, country: string, vatPrefix?: string): Promise<PeppolDocument> {
  const vat = vatPrefix ?? `${country}VAT123456789`;
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: country } },
      partyTaxSchemes: [{ companyId: vat, taxSchemeId: { id: 'VAT' } }],
    },
  } as unknown as PeppolDocument;
}

describe('IT-R-002 (Italian supplier address)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateItR002(document);
    })
  );

  it.effect(
    'fails when an Italian supplier has no address line',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withSupplierCountry(await decodeBaseExample(), 'IT'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          postalAddress: { ...document.accountingSupplierParty.postalAddress, streetName: undefined },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateItR002(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
