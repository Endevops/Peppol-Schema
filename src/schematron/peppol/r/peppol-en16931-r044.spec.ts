/**
 * @description Unit tests for PEPPOL-EN16931-R044 (no charge on price level).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils.ts';

import { validatePeppolEn16931R044 } from './peppol-en16931-r044.ts';

describe('PEPPOL-EN16931-R044 (no charge on price level)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R044(document);
    })
  );

  it.effect(
    'fails when a price-level allowance/charge is a charge',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ price: { allowanceCharge?: unknown } }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [
          { ...line, price: { ...line.price, allowanceCharge: { amount: { currencyId: 'EUR', value: 5 }, chargeIndicator: true } } },
          ...lines.slice(1),
        ],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R044(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'R044 and R046 should pass on the allowance example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.allowance));
      yield* validatePeppolEn16931R044(document);
    })
  );
});
