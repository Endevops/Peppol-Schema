// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolMessageLevelResponsePartySchema } from './peppol-message-level-response-party-schema';

describe('peppolMessageLevelResponsePartySchema', () => {
  const testSchema = new TestSchema.Asserts(peppolMessageLevelResponsePartySchema);
  const decode = testSchema.decoding();

  it('should decode a party with an endpoint id', async () => {
    await decode.succeed({ endpointId: { id: '7300010000001', schemeId: '0088' } });
  });

  it('should decode a party without an endpoint id', async () => {
    await decode.succeed({});
  });

  it('should reject an endpoint id without an id', async () => {
    await decode.fail({ endpointId: {} }, 'Missing key\n  at ["endpointId"]["id"]');
  });
});
