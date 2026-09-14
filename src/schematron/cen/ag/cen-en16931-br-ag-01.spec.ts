/**
 * @description Unit tests for CEN-EN16931-BR-AG-01.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrAg01 } from './cen-en16931-br-ag-01';

describe('CEN-EN16931-BR-AG-01', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrAg01(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].item.classifiedTaxCategory.id = 'M';
      const result = yield* validateCenEn16931BrAg01(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
