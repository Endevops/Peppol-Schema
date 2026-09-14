/**
 * @description Unit tests for PEPPOL-COMMON-R052 (Danish chamber of commerce, scheme 0096).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR052 } from './peppol-common-r052';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R052 (Danish chamber of commerce, scheme 0096)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR052(document);
    })
  );

  it.effect(
    'passes for a valid 10-digit number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0096', '1234567890'));
      yield* validatePeppolCommonR052(document);
    })
  );

  it.effect(
    'fails for an invalid number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0096', '123'));
      const result = yield* validatePeppolCommonR052(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
