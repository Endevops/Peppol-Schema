/**
 * @description Unit tests for DK-R-016 (Danish credit note cannot be negative).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validateDkR016 } from './dk-r-016';

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

describe('DK-R-016 (Danish credit note cannot be negative)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDkR016(document);
    })
  );

  it.effect(
    'fails when a Danish credit note has a negative payable amount',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withSupplierCountry(await decodeBaseExample(), 'DK'));
      const altered = {
        ...document,
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          partyTaxSchemes: [{ companyId: 'DK12345678', taxSchemeId: { id: 'VAT' } }],
          postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DK' } },
        },
        creditNoteLines: [{ id: '1' }],
        legalMonetaryTotal: { ...document.legalMonetaryTotal, payableAmount: { currencyId: 'EUR', value: -100 } },
      } as unknown as PeppolDocument;
      const result = yield* validateDkR016(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'DK-R-016 should pass on the credit note fixture (non-Danish)',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.creditNote));
      yield* validateDkR016(document);
    })
  );
});
