import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolTaxRepresentative } from '#/schemas/fields/peppol-tax-representative-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeAddress } from '#/decoders/fields/decode-address.ts';
import { decodePartyTaxScheme } from '#/decoders/fields/decode-party-tax-scheme.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeTaxRepresentativeParty = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolTaxRepresentative> | undefined> {
  const taxRepresentative = yield* getProp(doc, ...path);
  if (Predicate.isNullish(taxRepresentative)) return undefined;

  return {
    name: yield* strOrUnd(taxRepresentative, 'cac:PartyName', 'cbc:Name'),
    partyTaxScheme: yield* decodePartyTaxScheme(taxRepresentative, 'cac:PartyTaxScheme'),
    postalAddress: yield* decodeAddress(taxRepresentative, 'cac:PostalAddress'),
  };
});
