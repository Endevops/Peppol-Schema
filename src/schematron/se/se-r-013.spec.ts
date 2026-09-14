/**
 * @description Unit tests for SE-R-013 (Swedish org number Luhn).
 */
import { describe, it } from '@effect/vitest';
import { Effect } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR013 } from './se-r-013';

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

describe('SE-R-013 (Swedish org number Luhn)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateSeR013(document);
    })
  );

  it.effect(
    'passes for a valid Swedish org number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withSupplierCountry(await decodeBaseExample(), 'SE'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '5561234567', schemeId: '0007' } },
        },
      } as unknown as PeppolDocument;
      yield* validateSeR013(altered);
    })
  );
});
