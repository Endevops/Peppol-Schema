/**
 * @description Unit tests for PEPPOL-COMMON-R050 (Australian ABN, scheme 0151).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR050 } from './peppol-common-r050';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R050 (Australian ABN, scheme 0151)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR050(document);
    })
  );

  it.effect(
    'passes for a valid ABN',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0151', '51824753556'));
      yield* validatePeppolCommonR050(document);
    })
  );

  it.effect(
    'fails for an invalid ABN',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0151', '12345678901'));
      const result = yield* validatePeppolCommonR050(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
