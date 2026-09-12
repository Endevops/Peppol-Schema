// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolDocumentResponseLineResponseSchema } from './peppol-document-response-line-response-schema';

const response = { responseCode: 'RE', description: 'Validation gives error', status: { statusReasonCode: 'BV' } };

const validLineResponse = { lineReference: { lineId: '/Catalogue/cac:CatalogueLine[3]' }, response };

describe('peppolDocumentResponseLineResponseSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolDocumentResponseLineResponseSchema);
  const decode = testSchema.decoding();

  it('should decode a valid line response', async () => {
    await decode.succeed(validLineResponse);
  });

  it('should reject a line response without a line reference', async () => {
    await decode.fail({ response }, 'Missing key\n  at ["lineReference"]');
  });

  it('should reject a line response without a response', async () => {
    await decode.fail({ lineReference: validLineResponse.lineReference }, 'Missing key\n  at ["response"]');
  });

  it('should reject a line reference without a line id', async () => {
    await decode.fail({ lineReference: {}, response }, 'Missing key\n  at ["lineReference"]["lineId"]');
  });
});
