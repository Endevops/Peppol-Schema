import { Effect } from 'effect';

import type { PeppolNodeError } from '#/helpers/errors';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeBaseAllowanceCharge } from '#/decoders/fields/decode-base-allowance-charge';
import { decodeTaxCategory } from '#/decoders/fields/decode-tax-category';
import { getArray } from '#/helpers/get-array';

export const decodeAllowanceCharges = Effect.fn(function* (
  allowanceCharges: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<PeppolAllowanceCharge>> | undefined, PeppolNodeError> {
  const arr = yield* getArray(allowanceCharges, ...path);
  if (arr.length === 0) {
    return undefined;
  }

  return yield* Effect.forEach(
    arr,
    Effect.fn(function* (allowanceCharge: XmlNode) {
      return {
        ...(yield* decodeBaseAllowanceCharge(allowanceCharge)),
        taxCategory: yield* decodeTaxCategory(allowanceCharge, 'cac:TaxCategory'),
      } as RecursivePartial<PeppolAllowanceCharge>;
    })
  );
});
