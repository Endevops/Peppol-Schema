import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/party-tax-schema';
import type { RecursivePartial } from '#/types';

import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodePartyTaxScheme = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPartyTaxSchema> | undefined> {
  const node = yield* getProp(doc, ...path);
  if (Predicate.isNullish(node)) return undefined;

  return { companyId: yield* strOrUnd(node, 'cbc:CompanyID'), taxSchemeId: yield* decodeSimpleIdentifer(node, 'cac:TaxScheme') };
});
