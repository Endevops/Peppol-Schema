import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolDelivery } from '#/schemas/fields/delivery-schema';
import type { RecursivePartial } from '#/types';

import { decodeAddress } from '#/decoders/fields/decode-address';
import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

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
