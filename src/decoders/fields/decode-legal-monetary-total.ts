import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolLegalMonetaryTotal } from '#/schemas/fields/legal-monetary-total-schema';
import type { RecursivePartial } from '#/types';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { getProp } from '#/helpers/get-prop';

export const decodeLegalMonetaryTotal = Effect.fn(function* (
  node: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolLegalMonetaryTotal> | undefined> {
  const val = yield* getProp(node, ...path);
  if (Predicate.isNullish(val)) return undefined;

  return {
    allowanceTotalAmount: yield* decodeAmount(val, 'cbc:AllowanceTotalAmount'),
    chargeTotalAmount: yield* decodeAmount(val, 'cbc:ChargeTotalAmount'),
    lineExtensionAmount: yield* decodeAmount(val, 'cbc:LineExtensionAmount'),
    payableAmount: yield* decodeAmount(val, 'cbc:PayableAmount'),
    payableRoundingAmount: yield* decodeAmount(val, 'cbc:PayableRoundingAmount'),
    prepaidAmount: yield* decodeAmount(val, 'cbc:PrepaidAmount'),
    taxExclusiveAmount: yield* decodeAmount(val, 'cbc:TaxExclusiveAmount'),
    taxInclusiveAmount: yield* decodeAmount(val, 'cbc:TaxInclusiveAmount'),
  };
});
