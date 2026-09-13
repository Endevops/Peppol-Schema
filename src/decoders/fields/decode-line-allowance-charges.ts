import { Effect } from 'effect';

import type { PeppolNodeError } from '#/helpers/errors';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolLineAllowanceCharge } from '#/schemas/fields/line-allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeBaseAllowanceCharge } from '#/decoders/fields/decode-base-allowance-charge';
import { decodeNodeList } from '#/decoders/fields/decode-node-list';

export const decodeLineAllowanceCharges = Effect.fn(function* (
  allowanceCharges: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<PeppolLineAllowanceCharge>> | undefined, PeppolNodeError> {
  return yield* decodeNodeList(
    allowanceCharges,
    Effect.fn(function* (allowanceCharge: XmlNode) {
      return { ...(yield* decodeBaseAllowanceCharge(allowanceCharge)) } as RecursivePartial<PeppolLineAllowanceCharge>;
    }),
    ...path
  );
});
