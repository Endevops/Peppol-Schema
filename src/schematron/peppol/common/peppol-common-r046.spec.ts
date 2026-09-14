/**
 * @description Unit tests for PEPPOL-COMMON-R046 (Codice Fiscale, scheme 9907).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolCommonR046 } from './peppol-common-r046.ts';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R046 (Codice Fiscale, scheme 9907)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR046(document);
    })
  );

  it.effect(
    'fails for an invalid CF',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '9907', 'ABC'));
      const result = yield* validatePeppolCommonR046(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
