import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolLineAllowanceCharge } from '#/schemas/fields/peppol-line-allowance-charge-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeBaseAllowanceCharge } from '#/decoders/fields/decode-base-allowance-charge.ts';
import { decodeNodeList } from '#/decoders/fields/decode-node-list.ts';

export const decodeLineAllowanceCharges = Effect.fn(function* (allowanceCharges: XmlNode, ...path: Array<string>) {
  return yield* decodeNodeList(
    allowanceCharges,
    Effect.fn(function* (allowanceCharge: XmlNode) {
      return { ...(yield* decodeBaseAllowanceCharge(allowanceCharge)) } as RecursivePartial<PeppolLineAllowanceCharge>;
    }),
    ...path
  );
});
