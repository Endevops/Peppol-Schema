import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolAllowanceCharge } from '#/schemas/fields/peppol-allowance-charge-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeBaseAllowanceCharge } from '#/decoders/fields/decode-base-allowance-charge.ts';
import { decodeNodeList } from '#/decoders/fields/decode-node-list.ts';
import { decodeTaxCategory } from '#/decoders/fields/decode-tax-category.ts';

export const decodeAllowanceCharges = Effect.fn(function* (allowanceCharges: XmlNode, ...path: Array<string>) {
  return yield* decodeNodeList(
    allowanceCharges,
    Effect.fn(function* (allowanceCharge: XmlNode) {
      return {
        ...(yield* decodeBaseAllowanceCharge(allowanceCharge)),
        taxCategory: yield* decodeTaxCategory(allowanceCharge, 'cac:TaxCategory'),
      } as RecursivePartial<PeppolAllowanceCharge>;
    }),
    ...path
  );
});
