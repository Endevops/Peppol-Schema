import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolTaxSubTotal } from '#/schemas/fields/tax-subtotal-schema';
import type { PeppolTaxTotal } from '#/schemas/fields/tax-totals';
import type { RecursivePartial } from '#/types';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { numOrUnd } from '#/helpers/num-or-und';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeTaxTotals = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<PeppolTaxTotal>> | undefined> {
  const arr = yield* getArray(doc, ...path);
  if (arr.length === 0) return undefined;

  return yield* Effect.forEach(
    arr,
    Effect.fn(function* (n: XmlNode) {
      return { taxAmount: yield* decodeAmount(n, 'cbc:TaxAmount'), taxSubtotals: yield* decodeTaxSubTotal(n, 'cac:TaxSubtotal') };
    })
  );
});

const decodeTaxSubTotal = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<PeppolTaxSubTotal>> | undefined> {
  const arr = yield* getArray(doc, ...path);
  if (arr.length === 0) return undefined;
  return yield* Effect.forEach(
    arr,
    Effect.fn(function* (node: XmlNode) {
      return {
        taxAmount: yield* decodeAmount(node, 'cbc:TaxAmount'),
        taxCategory: yield* decodeTaxCategory(node, 'cac:TaxCategory'),
        taxableAmount: yield* decodeAmount(node, 'cbc:TaxableAmount'),
      };
    })
  );
});

const decodeTaxCategory = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolTaxSubTotal['taxCategory']> | undefined> {
  const node = yield* getProp(doc, ...path);
  if (Predicate.isNullish(node)) {
    return undefined;
  }

  return {
    id: yield* strOrUnd(node, 'cbc:ID'),
    percent: yield* numOrUnd(node, 'cbc:Percent'),
    taxExemptionReason: yield* strOrUnd(node, 'cbc:TaxExemptionReason'),
    taxExemptionReasonCode: yield* strOrUnd(node, 'cbc:TaxExemptionReasonCode'),
    taxSchemeId: yield* decodeSimpleIdentifer(node, 'cac:TaxScheme'),
  };
});
