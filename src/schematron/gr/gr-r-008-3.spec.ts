/**
 * @description Unit tests for GR-R-008-3 (invoice url external reference).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR008_3 } from './gr-r-008-3';

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

describe('GR-R-008-3 (invoice url external reference)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateGrR008_3(document);
    })
  );

  it.effect(
    'fails when a Greek invoice url has no external reference uri',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGreek(await decodeBaseExample()));
      const altered = {
        ...document,
        additionalDocumentReferences: [{ id: { id: 'a' }, documentDescription: '##INVOICE|URL##' }],
      } as unknown as PeppolDocument;
      const result = yield* validateGrR008_3(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Greek invoice url has an external reference uri',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGreek(await decodeBaseExample()));
      const altered = {
        ...document,
        additionalDocumentReferences: [
          { id: { id: 'a' }, documentDescription: '##INVOICE|URL##', attachment: { externalReference: { uri: 'https://example.com' } } },
        ],
      } as unknown as PeppolDocument;
      yield* validateGrR008_3(altered);
    })
  );
});
