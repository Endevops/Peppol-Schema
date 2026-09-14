/**
 * @description Unit tests for PEPPOL-EN16931-R120 (line net amount equals quantity * price).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931R120 } from './peppol-en16931-r120.ts';

describe('PEPPOL-EN16931-R120 (line net amount equals quantity * price)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R120(document);
    })
  );

  it.effect(
    'fails when the line extension amount does not match the computed value',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ lineExtensionAmount: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [{ ...line, lineExtensionAmount: { currencyId: 'EUR', value: 99999 } }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R120(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
