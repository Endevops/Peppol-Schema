/**
 * @description Unit tests for PEPPOL-EN16931-R121 (base quantity positive).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R121 } from './peppol-en16931-r121';

describe('PEPPOL-EN16931-R121 (base quantity positive)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R121(document);
    })
  );

  it.effect(
    'fails when the base quantity is zero',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ price: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [{ ...line, price: { ...line.price, baseQuantity: { value: 0, unitCode: 'C62' } } }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R121(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
