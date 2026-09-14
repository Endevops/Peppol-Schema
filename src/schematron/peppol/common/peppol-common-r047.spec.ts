/**
 * @description Unit tests for PEPPOL-COMMON-R047 (Italian VAT, scheme 0211).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolCommonR047 } from './peppol-common-r047.ts';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R047 (Italian VAT, scheme 0211)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR047(document);
    })
  );

  it.effect(
    'fails for an invalid Italian VAT',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0211', 'IT123'));
      const result = yield* validatePeppolCommonR047(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
