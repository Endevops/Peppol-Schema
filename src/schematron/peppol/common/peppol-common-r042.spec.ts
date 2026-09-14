/**
 * @description Unit tests for PEPPOL-COMMON-R042 (Danish CVR, scheme 0184).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolCommonR042 } from './peppol-common-r042.ts';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R042 (Danish CVR, scheme 0184)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR042(document);
    })
  );

  it.effect(
    'passes for a valid 8-digit CVR',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0184', '12345678'));
      yield* validatePeppolCommonR042(document);
    })
  );

  it.effect(
    'fails for an invalid CVR',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0184', '12345'));
      const result = yield* validatePeppolCommonR042(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
