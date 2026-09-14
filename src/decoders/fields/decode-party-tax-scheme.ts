import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/peppol-party-tax-scheme-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodePartyTaxScheme = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPartyTaxSchema> | undefined> {
  const node = yield* getProp(doc, ...path);
  if (Predicate.isNullish(node)) return undefined;

  return { companyId: yield* strOrUnd(node, 'cbc:CompanyID'), taxSchemeId: yield* decodeSimpleIdentifer(node, 'cac:TaxScheme') };
});
