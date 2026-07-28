import type { PeppolDelivery } from '#/schemas/fields/delivery-schema';

import { encodeAddress } from '#/decoders/fields/encode-address';
import { encodeIdentifier } from '#/decoders/fields/encode-identifier';

export function encodeDelivery(delivery: PeppolDelivery | undefined) {
  if (!delivery) return undefined;

  return {
    'cbc:ActualDeliveryDate': delivery.actualDeliveryDate,
    'cac:DeliveryLocation': encodeDeliveryLocation(delivery.deliveryLocation),
    'cac:DeliveryParty': delivery.deliveryParty?.partyName.name
      ? { 'cac:PartyName': { 'cbc:Name': delivery.deliveryParty?.partyName.name } }
      : undefined,
  };
}

function encodeDeliveryLocation(location: PeppolDelivery['deliveryLocation']) {
  if (!location) return undefined;
  return { 'cbc:ID': encodeIdentifier(location.id), 'cac:Address': encodeAddress(location.address) };
}
