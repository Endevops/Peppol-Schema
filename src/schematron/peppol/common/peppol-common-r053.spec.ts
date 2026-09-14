/**
 * @description Unit tests for PEPPOL-COMMON-R053 (Danish ERSTORG, scheme 0198).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR053 } from './peppol-common-r053';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R053 (Danish ERSTORG, scheme 0198)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR053(document);
    })
  );

  it.effect(
    'passes for a valid DK-prefixed number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0198', 'DK12345678'));
      yield* validatePeppolCommonR053(document);
    })
  );

  it.effect(
    'fails for an invalid number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0198', '123'));
      const result = yield* validatePeppolCommonR053(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
