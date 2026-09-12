import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartySchema } from '#/schemas/fields/party-base-schema';
import type { RecursivePartial } from '#/types';

import { decodeAddress } from '#/decoders/fields/decode-address';
import { decodeContact } from '#/decoders/fields/decode-contact';
import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { decodePartiesTaxScheme } from '#/decoders/fields/decode-parties-tax-scheme';
import { decodePartyLegalEntity } from '#/decoders/fields/decode-party-legal-entity';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeParty = Effect.fn(function* (
  party: XmlNode | undefined,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPartySchema> | undefined> {
  const val = yield* getProp(party, ...path);
  if (Predicate.isNullish(val)) return undefined;

  return {
    contact: yield* decodeContact(val, 'cac:Contact'),
    endpointId: yield* decodeElectronicAddress(val, 'cbc:EndpointID'),
    partyIdentification: yield* decodeAdditionalIdentifiers(val, 'cac:PartyIdentification'),
    partyLegalEntity: yield* decodePartyLegalEntity(val, 'cac:PartyLegalEntity'),
    partyName: yield* decodePartyName(val, 'cac:PartyName'),
    partyTaxSchemes: yield* decodePartiesTaxScheme(val, 'cac:PartyTaxScheme'),
    postalAddress: yield* decodeAddress(val, 'cac:PostalAddress'),
  };
});

const decodePartyName = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPartySchema['partyName']> | undefined> {
  const partyNameNode = yield* getProp(node, ...path);
  if (Predicate.isNullish(partyNameNode)) return undefined;
  return { name: yield* strOrUnd(partyNameNode, 'cbc:Name') };
});

const decodeAdditionalIdentifiers = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPartySchema['partyIdentification']> | undefined> {
  const val = yield* getProp(node, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return { id: yield* decodeIdentifier(val, 'cbc:ID') };
});
