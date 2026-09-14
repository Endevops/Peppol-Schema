/**
 * @description Unit tests for SE-R-003 (Swedish organisation numbers).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateSeR003 } from './se-r-003.ts';

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

describe('SE-R-003 (Swedish organisation numbers)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateSeR003(document);
    })
  );

  it.effect(
    'fails when a Swedish supplier has a non-numeric organisation number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withSupplierCountry(await decodeBaseExample(), 'SE'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: 'ABC', schemeId: '0007' } },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateSeR003(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
