/**
 * @description Unit tests for PEPPOL-EN16931-CL003 (charge reason code).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931CL003 } from './peppol-en16931-cl003.ts';

describe('PEPPOL-EN16931-CL003 (charge reason code)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931CL003(document);
    })
  );

  it.effect(
    'fails for an unsupported charge reason code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        allowanceCharges: [{ amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: true, allowanceChargeReasonCode: 'ZZ' }],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931CL003(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
