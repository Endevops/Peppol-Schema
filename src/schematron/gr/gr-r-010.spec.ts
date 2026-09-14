/**
 * @description Unit tests for GR-R-010 (buyer endpoint TIN).
 */
import { describe, it } from '@effect/vitest';
import { Effect } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR010 } from './gr-r-010';

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

describe('GR-R-010 (buyer endpoint TIN)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateGrR010(document);
    })
  );

  it.effect(
    'passes when a Greek buyer endpoint is a valid TIN with scheme 9933',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGreek(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingCustomerParty: { ...document.accountingCustomerParty, endpointId: { id: '094259216', schemeId: '9933' } },
      } as unknown as PeppolDocument;
      yield* validateGrR010(altered);
    })
  );
});
