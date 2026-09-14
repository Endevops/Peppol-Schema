/**
 * @description Unit tests for NL-R-005 (Dutch customer legal entity scheme).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateNlR005 } from './nl-r-005.ts';

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

describe('NL-R-005 (Dutch customer legal entity scheme)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateNlR005(document);
    })
  );

  it.effect(
    'fails when both parties are Dutch and the customer legal entity uses a wrong scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDutch(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: { id: '12345678', schemeId: '0196' } },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateNlR005(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when both parties are Dutch and the customer legal entity uses scheme 0190',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDutch(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: { id: '12345678', schemeId: '0190' } },
        },
      } as unknown as PeppolDocument;
      yield* validateNlR005(altered);
    })
  );
});
