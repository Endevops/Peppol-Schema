import { DateTime } from 'effect';
// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolDeliverySchema } from './peppol-delivery-schema';

describe('peppolDeliverySchema', () => {
  const testSchema = new TestSchema.Asserts(peppolDeliverySchema);
  const decode = testSchema.decoding();

  it('should parse an empty delivery', async () => {
    await decode.succeed({});
  });

  it('should parse a delivery with location and party', async () => {
    await decode.succeed(
      {
        actualDeliveryDate: '2017-12-01',
        deliveryLocation: { id: { id: '83745498753497', schemeId: '0088' }, address: { countryCode: { identificationCode: 'GB' } } },
        deliveryParty: { partyName: { name: 'Buyer Company Ltd' } },
      },
      {
        actualDeliveryDate: DateTime.makeUnsafe('2017-12-01'),
        deliveryLocation: { id: { id: '83745498753497', schemeId: '0088' }, address: { countryCode: { identificationCode: 'GB' } } },
        deliveryParty: { partyName: { name: 'Buyer Company Ltd' } },
      }
    );
  });

  it('should reject an invalid actual delivery date', async () => {
    await decode.fail(
      { actualDeliveryDate: '01-12-2017' },
      'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}Z?$\n  at ["actualDeliveryDate"]'
    );
  });

  it('should reject a delivery location id without an id', async () => {
    await decode.fail({ deliveryLocation: { id: {} } }, 'Missing key\n  at ["deliveryLocation"]["id"]["id"]');
  });

  it('should reject a delivery party without a name', async () => {
    await decode.fail({ deliveryParty: { partyName: {} } }, 'Missing key\n  at ["deliveryParty"]["partyName"]["name"]');
  });
});
