/**
 * @description Unit tests for PEPPOL-EN16931-R020 (seller electronic address).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931R020 } from './peppol-en16931-r020.ts';

describe('PEPPOL-EN16931-R020 (seller electronic address)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R020(document);
    })
  );

  it.effect(
    'fails when the supplier endpoint is missing',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: undefined },
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R020(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'fails when the supplier endpoint id is blank',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id: '', schemeId: '0088' } },
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R020(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
