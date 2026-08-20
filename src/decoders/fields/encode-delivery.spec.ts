import { describe, it, expect } from 'vitest';

import { encodeDelivery } from './encode-delivery';

describe('encodeDelivery', () => {
  it('returns undefined when delivery is missing', () => {
    // ❌ Negative: undefined delivery → undefined.
    expect(encodeDelivery(undefined)).toBeUndefined();
  });

  it('encodes a delivery with location and party', () => {
    // ✅ Positive: date, location (id + address) and delivery party are all encoded.
    expect(
      encodeDelivery({
        actualDeliveryDate: '2026-01-01',
        deliveryLocation: { id: { id: 'LOC-1', schemeId: 'GLN' }, address: { countryCode: { identificationCode: 'GB' }, cityName: 'London' } },
        deliveryParty: { partyName: { name: 'Deliver To Ltd' } },
      })
    ).toEqual({
      'cbc:ActualDeliveryDate': '2026-01-01',
      'cac:DeliveryLocation': {
        'cbc:ID': { '#text': 'LOC-1', '@schemeID': 'GLN' },
        'cac:Address': { 'cbc:CityName': 'London', 'cac:Country': { 'cbc:IdentificationCode': 'GB' } },
      },
      'cac:DeliveryParty': { 'cac:PartyName': { 'cbc:Name': 'Deliver To Ltd' } },
    });
  });

  it('omits the delivery party when it has no party name', () => {
    // ❌ Negative: delivery without deliveryParty → no cac:DeliveryParty.
    expect(encodeDelivery({ actualDeliveryDate: '2026-01-01', deliveryLocation: { id: { id: 'LOC-1' } } })?.['cac:DeliveryParty']).toBeUndefined();
  });

  it('omits the delivery location when absent', () => {
    // ❌ Negative: delivery without deliveryLocation → no cac:DeliveryLocation.
    expect(
      encodeDelivery({ actualDeliveryDate: '2026-01-01', deliveryParty: { partyName: { name: 'X' } } })?.['cac:DeliveryLocation']
    ).toBeUndefined();
  });
});
