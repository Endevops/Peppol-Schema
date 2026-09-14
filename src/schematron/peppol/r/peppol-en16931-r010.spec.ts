/**
 * @description Unit tests for PEPPOL-EN16931-R010 (buyer electronic address).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R010 } from './peppol-en16931-r010';

describe('PEPPOL-EN16931-R010 (buyer electronic address)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R010(document);
    })
  );

  it.effect(
    'fails when the customer endpoint is missing',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        accountingCustomerParty: { ...document.accountingCustomerParty, endpointId: undefined },
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R010(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'fails when the customer endpoint id is blank',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        accountingCustomerParty: { ...document.accountingCustomerParty, endpointId: { id: '  ', schemeId: '0088' } },
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R010(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
