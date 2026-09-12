import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolTaxRepresentativeParty } from '#/schemas/fields/tax-representative-party-schema';
import type { RecursivePartial } from '#/types';

import { decodeAddress } from '#/decoders/fields/decode-address';
import { decodePartyTaxScheme } from '#/decoders/fields/decode-party-tax-scheme';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeTaxRepresentativeParty = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolTaxRepresentativeParty> | undefined> {
  const taxRepresentative = yield* getProp(doc, ...path);
  if (Predicate.isNullish(taxRepresentative)) return undefined;

  return {
    name: yield* strOrUnd(taxRepresentative, 'cac:PartyName', 'cbc:Name'),
    partyTaxScheme: yield* decodePartyTaxScheme(taxRepresentative, 'cac:PartyTaxScheme'),
    postalAddress: yield* decodeAddress(taxRepresentative, 'cac:PostalAddress'),
  };
});
