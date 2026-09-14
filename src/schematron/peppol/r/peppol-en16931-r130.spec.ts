/**
 * @description Unit tests for PEPPOL-EN16931-R130 (unit code of base quantity matches quantity).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R130 } from './peppol-en16931-r130';

describe('PEPPOL-EN16931-R130 (unit code of base quantity matches quantity)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R130(document);
    })
  );

  it.effect(
    'fails when the base quantity unit code differs from the invoiced quantity unit code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ price: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [{ ...line, price: { ...line.price, baseQuantity: { value: 1, unitCode: 'C62' } } }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R130(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
