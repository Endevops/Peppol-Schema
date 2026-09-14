/**
 * @description Unit tests for GR-R-001-4 (third segment is a positive integer).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR001_4 } from './gr-r-001-4';

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

const VALID_GREEK_ID = '094259216|13/11/2017|1|1.1|0|1';

describe('GR-R-001-4 (third segment is a positive integer)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateGrR001_4(document);
    })
  );

  it.effect(
    'fails when the third segment is not a number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGreek(await decodeBaseExample()));
      const altered = { ...document, id: '094259216|13/11/2017|abc|1.1|0|1' } as unknown as PeppolDocument;
      const result = yield* validateGrR001_4(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when the third segment is a positive integer',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGreek(await decodeBaseExample()));
      const altered = { ...document, id: VALID_GREEK_ID } as unknown as PeppolDocument;
      yield* validateGrR001_4(altered);
    })
  );
});
