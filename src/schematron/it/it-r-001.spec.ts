/**
 * @description Unit tests for IT-R-001 (Italian seller tax registration identifier length).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateItR001 } from './it-r-001.ts';

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

describe('IT-R-001 (Italian seller tax registration identifier length)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateItR001(document);
    })
  );

  it.effect(
    'fails when an Italian supplier has a too-short tax registration identifier',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withSupplierCountry(await decodeBaseExample(), 'IT'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyTaxSchemes: [
            { companyId: '1234567890', taxSchemeId: { id: 'TAX' } },
            { companyId: 'IT123456789', taxSchemeId: { id: 'VAT' } },
          ],
        },
      } as unknown as PeppolDocument;
      const result = yield* validateItR001(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
