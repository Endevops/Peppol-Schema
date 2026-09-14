/**
 * @description Unit tests for PEPPOL-EN16931-R046 (item net price = gross price - allowance amount).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931R046 } from './peppol-en16931-r046';

describe('PEPPOL-EN16931-R046 (item net price = gross price - allowance amount)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R046(document);
    })
  );

  it.effect(
    'fails when the price amount differs from base amount minus allowance amount',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ price: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [
          {
            ...line,
            price: {
              ...line.price,
              priceAmount: { currencyId: 'EUR', value: 100 },
              allowanceCharge: { amount: { currencyId: 'EUR', value: 10 }, baseAmount: { currencyId: 'EUR', value: 50 }, chargeIndicator: false },
            },
          },
          ...lines.slice(1),
        ],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R046(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'R044 and R046 should pass on the allowance example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.allowance));
      yield* validatePeppolEn16931R046(document);
    })
  );
});
