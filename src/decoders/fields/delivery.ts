import type { XmlNode } from '#/helpers';
import type { PeppolDelivery } from '#/schemas/fields/delivery-schema';
import type { RecursivePartial } from '#/types';

import { decodeAddress, encodeAddress } from '#/decoders/fields/address';
import { decodeIdentifier, encodeIdentifier } from '#/decoders/fields/identifier';
import { getProp, strOrUnd } from '#/helpers';

export function decodeDelivery(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolDelivery> | undefined {
  const val = getProp(node, ...path);
  if (!val) return undefined;

  return {
    actualDeliveryDate: strOrUnd(val, 'cbc:ActualDeliveryDate'),
    deliveryLocation: decodeDeliveryLocation(val, 'cac:DeliveryLocation'),
    deliveryParty: decodeDeliveryParty(val, 'cac:DeliveryParty'),
  };
}

function decodeDeliveryLocation(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolDelivery['deliveryLocation']> | undefined {
  const val = getProp(node, ...path);
  if (!val) return undefined;

  return { address: decodeAddress(val, 'cac:Address'), id: decodeIdentifier(val, 'cbc:ID') };
}
function decodeDeliveryParty(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolDelivery['deliveryParty']> | undefined {
  const val = getProp(node, ...path);
  if (!val) return undefined;
  const name = strOrUnd(val, 'cac:PartyName', 'cbc:Name');
  if (!name) return undefined;

  return { partyName: { name } };
}

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
