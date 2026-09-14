import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolAllowanceCharge } from '#/schemas/fields/peppol-allowance-charge-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { numOrUnd } from '#/helpers/num-or-und.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

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
