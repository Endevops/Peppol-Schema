/**
 * @description Unit tests for PEPPOL-EN16931-R002 (no more than one note).
 */
import { describe, it } from '@effect/vitest';
import { Effect } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931R002 } from './peppol-en16931-r002.ts';

describe('PEPPOL-EN16931-R002 (no more than one note)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R002(document);
    })
  );

  it.effect(
    'passes when there is no note',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R002(document);
    })
  );

  it.effect(
    'passes when there is a single note',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => ({ ...(await decodeBaseExample()), note: 'a note' }) as unknown as PeppolDocument);
      yield* validatePeppolEn16931R002(document);
    })
  );
});
