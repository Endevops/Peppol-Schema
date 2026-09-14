/**
 * @description Unit tests for DE-R-016 (VAT codes require seller tax id).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR016 } from './de-r-016';

async function asGerman(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DE' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DE' } },
    },
  } as unknown as PeppolDocument;
}

describe('DE-R-016 (VAT codes require seller tax id)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR016(document);
    })
  );

  it.effect(
    'fails when a German document uses VAT code S without a seller tax identifier',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: { ...document.accountingSupplierParty, partyTaxSchemes: undefined },
      } as unknown as PeppolDocument;
      const result = yield* validateDeR016(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a German document uses VAT code S with a seller tax identifier',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: { ...document.accountingSupplierParty, partyTaxSchemes: [{ companyId: 'DE123456789', taxSchemeId: { id: 'VAT' } }] },
      } as unknown as PeppolDocument;
      yield* validateDeR016(altered);
    })
  );
});
