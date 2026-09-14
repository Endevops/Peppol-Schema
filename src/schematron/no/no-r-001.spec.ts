/**
 * @description Unit tests for NO-R-001 (Norwegian VAT number format).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNoR001 } from './no-r-001';

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

describe('NO-R-001 (Norwegian VAT number format)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateNoR001(document);
    })
  );

  it.effect(
    'fails when a Norwegian supplier has an invalid VAT number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withSupplierCountry(await decodeBaseExample(), 'NO', 'NO123456789MVA'));
      const result = yield* validateNoR001(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
