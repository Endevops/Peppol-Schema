/**
 * @description Unit tests for NL-R-009 (order line reference requires order reference).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateNlR009 } from './nl-r-009.ts';

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

describe('NL-R-009 (order line reference requires order reference)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateNlR009(document);
    })
  );

  it.effect(
    'fails when a Dutch document has an order line reference but no order reference',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDutch(await decodeBaseExample()));
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ orderLineReference?: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        orderReference: undefined,
        invoiceLines: [{ ...line, orderLineReference: { lineId: '1' } }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      const result = yield* validateNlR009(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Dutch document has both order line reference and order reference',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDutch(await decodeBaseExample()));
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ orderLineReference?: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        orderReference: { id: 'ORD-1' },
        invoiceLines: [{ ...line, orderLineReference: { lineId: '1' } }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      yield* validateNlR009(altered);
    })
  );
});
