/**
 * @description Unit tests for IS-R-009 (EINDAGI requires due date).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateIsR009 } from './is-r-009.ts';

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

describe('IS-R-009 (EINDAGI requires due date)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateIsR009(document);
    })
  );

  it.effect(
    'fails when an Icelandic EINDAGI document has no due date',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      const altered = {
        ...document,
        dueDate: undefined,
        additionalDocumentReferences: [{ id: { id: '2024-01-15' }, documentDescription: 'EINDAGI' }],
      } as unknown as PeppolDocument;
      const result = yield* validateIsR009(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when an Icelandic EINDAGI document has a due date',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      const altered = {
        ...document,
        additionalDocumentReferences: [{ id: { id: '2024-01-15' }, documentDescription: 'EINDAGI' }],
      } as unknown as PeppolDocument;
      yield* validateIsR009(altered);
    })
  );
});
