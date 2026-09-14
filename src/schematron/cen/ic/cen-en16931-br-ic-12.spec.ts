/**
 * @description Unit tests for CEN-EN16931-BR-IC-12.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrIc12 } from './cen-en16931-br-ic-12';

describe('CEN-EN16931-BR-IC-12', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrIc12(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals[0].taxSubtotals[0].taxCategory = { ...document.taxTotals[0].taxSubtotals[0].taxCategory, id: 'K', percent: undefined };
      document.delivery.deliveryLocation.address.countryCode.identificationCode = '';
      const result = yield* validateCenEn16931BrIc12(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
