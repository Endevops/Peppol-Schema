/**
 * @description Unit tests for PEPPOL-EN16931-CL002 (allowance reason code).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931CL002 } from './peppol-en16931-cl002';

describe('PEPPOL-EN16931-CL002 (allowance reason code)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931CL002(document);
    })
  );

  it.effect(
    'fails for an unsupported allowance reason code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        allowanceCharges: [{ amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: false, allowanceChargeReasonCode: '9999' }],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931CL002(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
