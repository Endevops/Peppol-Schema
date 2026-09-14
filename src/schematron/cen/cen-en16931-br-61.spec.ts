/**
 * @description Unit tests for CEN-EN16931-BR-61.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931Br61 } from './cen-en16931-br-61.ts';

describe('CEN-EN16931-BR-61', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br61(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.paymentMeans = [
        { paymentMeansCode: { code: '58' }, payeeFinancialAccount: { id: '', name: undefined, financialInstitutionBranch: undefined } },
      ];
      const result = yield* validateCenEn16931Br61(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
