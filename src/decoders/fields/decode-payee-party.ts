import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPayeeParty } from '#/schemas/fields/payee-party';
import type { RecursivePartial } from '#/types';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

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
