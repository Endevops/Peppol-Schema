/**
 * @description Unit tests for SE-R-006 (standard VAT rate).
 */
import { assert, describe, expect, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateSeR006 } from './se-r-006.ts';

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

describe('SE-R-006 (standard VAT rate)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateSeR006(document);
    })
  );

  it.effect(
    'fails when a Swedish supplier uses an unsupported VAT rate',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ item: any }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        expect.unreachable('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [
          { ...line, item: { ...line.item, classifiedTaxCategory: { ...line.item.classifiedTaxCategory, percent: 17 } } },
          ...lines.slice(1),
        ],
      } as unknown as PeppolDocument;
      const result = yield* validateSeR006(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Swedish supplier uses a standard VAT rate',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asSwedish(await decodeBaseExample()));
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ item: any }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        expect.unreachable('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [
          { ...line, item: { ...line.item, classifiedTaxCategory: { ...line.item.classifiedTaxCategory, percent: 25 } } },
          ...lines.slice(1),
        ],
      } as unknown as PeppolDocument;
      yield* validateSeR006(altered);
    })
  );
});
