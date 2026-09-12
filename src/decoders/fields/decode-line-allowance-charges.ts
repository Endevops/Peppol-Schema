import { Effect } from 'effect';

import type { PeppolNodeError } from '#/helpers/errors';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolLineAllowanceCharge } from '#/schemas/fields/line-allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeBaseAllowanceCharge } from '#/decoders/fields/decode-base-allowance-charge';
import { getArray } from '#/helpers/get-array';

export const decodeLineAllowanceCharges = Effect.fn(function* (
  allowanceCharges: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<PeppolLineAllowanceCharge>> | undefined, PeppolNodeError> {
  const arr = yield* getArray(allowanceCharges, ...path);
  if (arr.length === 0) {
    return undefined;
  }
  return yield* Effect.forEach(
    arr,
    Effect.fn(function* (allowanceCharge: XmlNode) {
      return { ...(yield* decodeBaseAllowanceCharge(allowanceCharge)) } as RecursivePartial<PeppolLineAllowanceCharge>;
    })
  );
});
