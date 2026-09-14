/**
 * @description Unit tests for SE-R-004 (Swedish organisation numbers 10 characters).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateSeR004 } from './se-r-004';

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

async function asSwedish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'SE' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'SE556123456701', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'SE' } },
    },
  } as unknown as PeppolDocument;
}

describe('SE-R-004 (Swedish organisation numbers 10 characters)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateSeR004(document);
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
      const result = yield* validateSeR004(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
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
      const result = yield* validateSeR004(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when the supplier is not Swedish',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateSeR004(document);
    })
  );

  it.effect(
    'fails when a Swedish organisation number is not 10 characters',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '123', schemeId: '0007' } },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateSeR004(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Swedish organisation number is 10 characters',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: { id: '5561234567', schemeId: '0007' } },
        },
      } as unknown as PeppolDocument;
      yield* validateSeR004(altered);
    })
  );
});
