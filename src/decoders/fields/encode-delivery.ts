import { Effect, Predicate } from 'effect';

import type { PeppolDelivery } from '#/schemas/fields/delivery-schema';

import { encodeAddress } from '#/decoders/fields/encode-address';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';

export const encodeDelivery = Effect.fn(function* (delivery: PeppolDelivery | undefined) {
  if (Predicate.isNullish(delivery)) return undefined;

  return {
    'cbc:ActualDeliveryDate': delivery.actualDeliveryDate,
    'cac:DeliveryLocation': yield* encodeDeliveryLocation(delivery.deliveryLocation),
    'cac:DeliveryParty': Predicate.isTruthy(delivery.deliveryParty?.partyName.name)
      ? { 'cac:PartyName': { 'cbc:Name': delivery.deliveryParty?.partyName.name } }
      : undefined,
  };
});

const encodeDeliveryLocation = Effect.fn(function* (location: PeppolDelivery['deliveryLocation']) {
  if (Predicate.isNullish(location)) return undefined;
  return { 'cbc:ID': yield* encodeIdentifier(location.id), 'cac:Address': yield* encodeAddress(location.address) };
});
