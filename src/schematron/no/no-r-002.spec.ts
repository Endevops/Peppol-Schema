/**
 * @description Unit tests for NO-R-002 (Foretaksregisteret).
 */
import { describe, it } from '@effect/vitest';
import { Effect } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateNoR002 } from './no-r-002.ts';

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

describe('NO-R-002 (Foretaksregisteret)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateNoR002(document);
    })
  );

  it.effect(
    'fails when a Norwegian supplier does not state Foretaksregisteret',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withSupplierCountry(await decodeBaseExample(), 'NO'));
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyTaxSchemes: [
            { companyId: 'Foretaksregisteret', taxSchemeId: { id: 'TAX' } },
            { companyId: 'NO123456789MVA', taxSchemeId: { id: 'VAT' } },
          ],
        },
      } as unknown as PeppolDocument;
      yield* validateNoR002(altered);
    })
  );
});
