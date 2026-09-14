/**
 * @description Unit tests for CEN-EN16931-BR-55.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br55 } from './cen-en16931-br-55';

describe('CEN-EN16931-BR-55', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br55(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.billingReferences = [{ invoiceDocumentReference: { id: '', issueDate: undefined } }];
      const result = yield* validateCenEn16931Br55(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
