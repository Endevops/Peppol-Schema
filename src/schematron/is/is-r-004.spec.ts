/**
 * @description Unit tests for IS-R-004 (buyer legal id scheme 0196).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR004 } from './is-r-004';

async function asIcelandic(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'IS123456789', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'IS' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'IS987654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'IS' } },
    },
  } as unknown as PeppolDocument;
}

describe('IS-R-004 (buyer legal id scheme 0196)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateIsR004(document);
    })
  );

  it.effect(
    'fails when both parties are Icelandic and the buyer has no legal id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: undefined },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateIsR004(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when both parties are Icelandic and the buyer has a legal id with scheme 0196',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: { id: '1234567890', schemeId: '0196' } },
        },
      } as unknown as PeppolDocument;
      yield* validateIsR004(altered);
    })
  );
});
