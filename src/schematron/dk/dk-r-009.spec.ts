/**
 * @description Unit tests for DK-R-009 (giro 16 digit instruction id).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR009 } from './dk-r-009';

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

describe('DK-R-009 (giro 16 digit instruction id)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDkR009(document);
    })
  );

  it.effect(
    'fails when a Danish document uses code 50 with a 04# prefix but wrong length',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '50' }, paymentId: '04#12345' }] } as unknown as PeppolDocument;
      const result = yield* validateDkR009(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
