import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAllowanceCharge } from '#/schemas/fields/peppol-allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeBaseAllowanceCharge } from '#/decoders/fields/decode-base-allowance-charge';
import { decodeNodeList } from '#/decoders/fields/decode-node-list';
import { decodeTaxCategory } from '#/decoders/fields/decode-tax-category';

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
