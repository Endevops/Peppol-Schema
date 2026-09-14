/**
 * @description Unit tests for IS-R-010 (EINDAGI id same or later than due date).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateIsR010 } from './is-r-010.ts';

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

describe('IS-R-010 (EINDAGI id same or later than due date)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateIsR010(document);
    })
  );

  it.effect(
    'fails when an Icelandic EINDAGI id is earlier than the due date',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      const altered = {
        ...document,
        dueDate: '2024-12-01',
        additionalDocumentReferences: [{ id: { id: '2024-01-15' }, documentDescription: 'EINDAGI' }],
      } as unknown as PeppolDocument;
      const result = yield* validateIsR010(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when an Icelandic EINDAGI id is later than the due date',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      const altered = {
        ...document,
        dueDate: '2024-01-15',
        additionalDocumentReferences: [{ id: { id: '2024-12-01' }, documentDescription: 'EINDAGI' }],
      } as unknown as PeppolDocument;
      yield* validateIsR010(altered);
    })
  );
});
