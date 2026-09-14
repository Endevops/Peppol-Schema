/**
 * @description Unit tests for GR-R-006 (buyer VAT when buyer is Greek).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateGrR006 } from './gr-r-006.ts';

async function asGreek(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'EL094259216', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'GR' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'EL094259216', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'GR' } },
    },
  } as unknown as PeppolDocument;
}

describe('GR-R-006 (buyer VAT when buyer is Greek)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateGrR006(document);
    })
  );

  it.effect(
    'passes when both parties are Greek and the buyer VAT is valid',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGreek(await decodeBaseExample()));
      yield* validateGrR006(document);
    })
  );

  it.effect(
    'fails when both parties are Greek and the buyer VAT is not a valid TIN',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGreek(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingCustomerParty: { ...document.accountingCustomerParty, partyTaxSchemes: [{ companyId: 'EL123456789', taxSchemeId: { id: 'VAT' } }] },
      } as unknown as PeppolDocument;
      const result = yield* validateGrR006(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
