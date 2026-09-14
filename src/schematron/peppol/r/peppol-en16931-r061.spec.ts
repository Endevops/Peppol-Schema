/**
 * @description Unit tests for PEPPOL-EN16931-R061 (mandate reference for direct debit).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample, decodeFixture } from '#/test/test-utils';

import { validatePeppolEn16931R061 } from './peppol-en16931-r061';

describe('PEPPOL-EN16931-R061 (mandate reference for direct debit)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R061(document);
    })
  );

  it.effect(
    'fails when a direct debit payment has no mandate reference',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '49' }, paymentMandate: { id: undefined } }],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R061(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a direct debit payment has a mandate reference',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '59' }, paymentMandate: { id: 'MANDATE-1' } }],
      } as unknown as PeppolDocument;
      yield* validatePeppolEn16931R061(altered);
    })
  );

  it.effect(
    'R061 should pass on a credit note',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture('#/test/files/v3/credit-note/base-creditnote-correction.xml'));
      yield* validatePeppolEn16931R061(document);
    })
  );
});
