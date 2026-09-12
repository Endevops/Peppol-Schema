import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getProp } from '#/helpers/get-prop';
import { numOrUnd } from '#/helpers/num-or-und';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeTaxCategory = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolAllowanceCharge['taxCategory']> | undefined> {
  const taxCategory = yield* getProp(doc, ...path);
  if (Predicate.isNullish(taxCategory)) {
    return undefined;
  }

  return {
    id: yield* strOrUnd(taxCategory, 'cbc:ID'),
    percent: yield* numOrUnd(taxCategory, 'cbc:Percent'),
    taxSchemeId: yield* decodeSimpleIdentifer(taxCategory, 'cac:TaxScheme'),
  };
});
