/**
 * @description Unit tests for GR-S-008-1 (exactly one invoice url).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrS008_1 } from './gr-s-008-1';

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

describe('GR-S-008-1 (exactly one invoice url)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateGrS008_1(document);
    })
  );

  it.effect(
    'fails when a Greek document has two invoice urls',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGreek(await decodeBaseExample()));
      const altered = {
        ...document,
        additionalDocumentReferences: [
          { id: { id: 'a' }, documentDescription: '##INVOICE|URL##' },
          { id: { id: 'b' }, documentDescription: '##INVOICE|URL##' },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validateGrS008_1(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
