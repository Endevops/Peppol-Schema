/**
 * @description Unit tests for PEPPOL-EN16931-R043 (charge indicator value).
 */
import { describe, it } from '@effect/vitest';
import { Effect } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931R043 } from './peppol-en16931-r043.ts';

describe('PEPPOL-EN16931-R043 (charge indicator value)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R043(document);
    })
  );

  it.effect(
    'passes when all allowance/charge indicators are booleans',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R043(document);
    })
  );

  it.effect(
    'passes when there are no allowance/charges',
    Effect.fn(function* () {
      const document = yield* Effect.promise(
        async () => ({ ...(await decodeBaseExample()), allowanceCharges: undefined }) as unknown as PeppolDocument
      );
      yield* validatePeppolEn16931R043(document);
    })
  );
});
