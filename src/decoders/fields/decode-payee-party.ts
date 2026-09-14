import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolPayeeParty } from '#/schemas/fields/peppol-payee-party-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodePayeeParty = Effect.fn(function* (
  payee: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPayeeParty> | undefined> {
  const node = yield* getProp(payee, ...path);
  if (Predicate.isNullish(node)) return undefined;
  return {
    partyIdentification: yield* decodePartyIdentification(node, 'cac:PartyIdentification'),
    partyLegalEntity: yield* decodePartyLegalEntity(node, 'cac:PartyLegalEntity'),
    partyName: yield* decodePartyName(node, 'cac:PartyName'),
  };
});

const decodePartyLegalEntity = Effect.fn(function* (
  party: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPayeeParty['partyLegalEntity']> | undefined> {
  const node = yield* getProp(party, ...path);
  if (Predicate.isNullish(node)) return undefined;
  return { companyId: yield* decodeIdentifier(node, 'cbc:CompanyID') };
});

const decodePartyName = Effect.fn(function* (
  party: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPayeeParty['partyName']> | undefined> {
  const node = yield* getProp(party, ...path);
  if (Predicate.isNullish(node)) return undefined;
  return { name: yield* strOrUnd(node, 'cbc:Name') };
});

const decodePartyIdentification = Effect.fn(function* (
  party: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPayeeParty['partyIdentification']> | undefined> {
  const node = yield* getProp(party, ...path);
  if (Predicate.isNullish(node)) return undefined;
  return { id: yield* decodeIdentifier(node, 'cbc:ID') };
});
