import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeDelivery } from './decode-delivery';

const fullDeliveryDoc = {
  'cac:Delivery': {
    'cac:DeliveryLocation': { 'cac:Address': { 'cbc:CityName': 'Oslo', 'cbc:StreetName': 'Main St' }, 'cbc:ID': 'LOC-1' },
    'cac:DeliveryParty': { 'cac:PartyName': { 'cbc:Name': 'Acme' } },
    'cbc:ActualDeliveryDate': '2024-02-01',
  },
};

describe('decodeDelivery', () => {
  it('returns undefined when the delivery path is missing', () => {
    const result = Effect.runSync(decodeDelivery({}, 'cac:Delivery'));

    expect(result).toBeUndefined();
  });

  it('decodes a fully populated delivery node', () => {
    const result = Effect.runSync(decodeDelivery(fullDeliveryDoc, 'cac:Delivery'));

    expect(result).toEqual({
      actualDeliveryDate: '2024-02-01',
      deliveryLocation: { address: expect.objectContaining({ cityName: 'Oslo', streetName: 'Main St' }), id: { id: 'LOC-1' } },
      deliveryParty: { partyName: { name: 'Acme' } },
    });
  });

  it('decodes a delivery without location or party to undefined fields', () => {
    const result = Effect.runSync(decodeDelivery({ 'cac:Delivery': {} }, 'cac:Delivery'));

    expect(result).toEqual({ actualDeliveryDate: undefined, deliveryLocation: undefined, deliveryParty: undefined });
  });

  it('returns undefined when a delivery party has no name', () => {
    const result = Effect.runSync(decodeDelivery({ 'cac:Delivery': { 'cac:DeliveryParty': {} } }, 'cac:Delivery'));

    expect(result).toEqual({ actualDeliveryDate: undefined, deliveryLocation: undefined, deliveryParty: undefined });
  });

  it('decodes a delivery location without an address or id', () => {
    const result = Effect.runSync(
      decodeDelivery({ 'cac:Delivery': { 'cac:DeliveryParty': { 'cac:PartyName': { 'cbc:Name': 'Acme' } } } }, 'cac:Delivery')
    );

    expect(result).toEqual({ actualDeliveryDate: undefined, deliveryLocation: undefined, deliveryParty: { partyName: { name: 'Acme' } } });
  });
});
