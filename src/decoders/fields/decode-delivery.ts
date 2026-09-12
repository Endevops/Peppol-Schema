import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolDelivery } from '#/schemas/fields/delivery-schema';
import type { RecursivePartial } from '#/types';

import { decodeAddress } from '#/decoders/fields/decode-address';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeDelivery = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolDelivery> | undefined> {
  const val = yield* getProp(node, ...path);
  if (Predicate.isNullish(val)) return undefined;

  return {
    actualDeliveryDate: yield* strOrUnd(val, 'cbc:ActualDeliveryDate'),
    deliveryLocation: yield* decodeDeliveryLocation(val, 'cac:DeliveryLocation'),
    deliveryParty: yield* decodeDeliveryParty(val, 'cac:DeliveryParty'),
  };
});

const decodeDeliveryLocation = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolDelivery['deliveryLocation']> | undefined> {
  const val = yield* getProp(node, ...path);
  if (Predicate.isNullish(val)) return undefined;

  return { address: yield* decodeAddress(val, 'cac:Address'), id: yield* decodeIdentifier(val, 'cbc:ID') };
});

const decodeDeliveryParty = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolDelivery['deliveryParty']> | undefined> {
  const val = yield* getProp(node, ...path);
  if (Predicate.isNullish(val)) return undefined;
  const name = yield* strOrUnd(val, 'cac:PartyName', 'cbc:Name');
  if (!Predicate.isTruthy(name)) return undefined;

  return { partyName: { name } };
});
