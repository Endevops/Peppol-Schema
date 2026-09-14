/**
 * @description Unit tests for DE-R-022 (unique attachment filenames).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDeR022 } from './de-r-022.ts';

async function withCountry(
  document: PeppolDocument,
  supplierCountry: string,
  customerCountry: string,
  supplierVatPrefix = `${supplierCountry}VAT123456789`,
  customerVatPrefix = `${customerCountry}VAT123456789`
): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: supplierVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: supplierCountry } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: customerVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: customerCountry } },
    },
  } as unknown as PeppolDocument;
}

describe('DE-R-022 (unique attachment filenames)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR022(document);
    })
  );

  it.effect(
    'fails when both parties are German and two attachments share a filename',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withCountry(await decodeBaseExample(), 'DE', 'DE'));
      const altered = {
        ...document,
        additionalDocumentReferences: [
          {
            id: { id: 'a' },
            attachment: { embeddedDocumentBinaryObject: { content: 'aGVsbG8=', mimeCode: 'application/pdf', filename: 'same.pdf' } },
          },
          {
            id: { id: 'b' },
            attachment: { embeddedDocumentBinaryObject: { content: 'aGVsbG8=', mimeCode: 'application/pdf', filename: 'SAME.PDF' } },
          },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validateDeR022(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
