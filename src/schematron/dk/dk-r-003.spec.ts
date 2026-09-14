/**
 * @description Unit tests for DK-R-003 (UNSPSC version).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDkR003 } from './dk-r-003.ts';

async function asDanish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'DK12345678', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'DK87654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
  } as unknown as PeppolDocument;
}

describe('DK-R-003 (UNSPSC version)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDkR003(document);
    })
  );

  it.effect(
    'fails when a Danish line uses listID TST with an unsupported version',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ item: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [
          { ...line, item: { ...line.item, commodityClassifications: [{ itemClassification: { id: '123', listId: 'TST', listVersionId: '1.0' } }] } },
          ...lines.slice(1),
        ],
      } as unknown as PeppolDocument;
      const result = yield* validateDkR003(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Danish line uses listID TST with a supported version',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ item: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [
          {
            ...line,
            item: { ...line.item, commodityClassifications: [{ itemClassification: { id: '123', listId: 'TST', listVersionId: '26.0801' } }] },
          },
          ...lines.slice(1),
        ],
      } as unknown as PeppolDocument;
      yield* validateDkR003(altered);
    })
  );
});
