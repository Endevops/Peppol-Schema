/**
 * @description Unit tests for CEN-EN16931-BR-IC-05.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrIc05 } from './cen-en16931-br-ic-05';

describe('CEN-EN16931-BR-IC-05', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrIc05(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].item.classifiedTaxCategory = { ...document.invoiceLines[0].item.classifiedTaxCategory, id: 'K', percent: 21 };
      const result = yield* validateCenEn16931BrIc05(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
