import { Effect, Predicate } from 'effect';

import type { PeppolPayeeParty } from '#/schemas/fields/payee-party';

import { encodeIdentifier } from '#/decoders/fields/encode-identifier';

export const encodePayeeParty = Effect.fn(function* (payeeParty: PeppolPayeeParty | undefined) {
  if (Predicate.isNullish(payeeParty)) return undefined;
  return {
    'cac:PartyIdentification': yield* encodePartyIdentification(payeeParty.partyIdentification),
    'cac:PartyName': yield* encodePartyName(payeeParty.partyName),
    'cac:PartyLegalEntity': yield* encodePartyLegalEntity(payeeParty.partyLegalEntity),
  };
});

const encodePartyName = Effect.fn(function* (partyName: PeppolPayeeParty['partyName']) {
  return { 'cbc:Name': partyName.name };
});

const encodePartyLegalEntity = Effect.fn(function* (partyLegalEntity: PeppolPayeeParty['partyLegalEntity']) {
  if (Predicate.isNullish(partyLegalEntity)) return undefined;
  return { 'cbc:CompanyId': Predicate.isTruthy(partyLegalEntity?.companyId) ? yield* encodeIdentifier(partyLegalEntity?.companyId) : undefined };
});

const encodePartyIdentification = Effect.fn(function* (partyIdentification: PeppolPayeeParty['partyIdentification']) {
  if (Predicate.isNullish(partyIdentification)) return undefined;
  return { 'cbc:ID': Predicate.isTruthy(partyIdentification.id) ? yield* encodeIdentifier(partyIdentification.id) : undefined };
});
