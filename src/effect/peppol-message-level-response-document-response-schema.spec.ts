// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolMessageLevelResponseDocumentResponseSchema } from './peppol-message-level-response-document-response-schema';

const lineResponse = {
  lineReference: { lineId: '/Catalogue/cac:CatalogueLine[3]' },
  response: { responseCode: 'RE', description: 'Validation gives error', status: { statusReasonCode: 'BV' } },
};

const validDocumentResponse = {
  response: { responseCode: 'RE', description: 'Rejected due to validation errors' },
  documentReference: { id: 'EnvelopeID-12456789', documentTypeCode: '9', versionId: '2' },
  lineResponse: [lineResponse],
};

describe('peppolMessageLevelResponseDocumentResponseSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolMessageLevelResponseDocumentResponseSchema);
  const decode = testSchema.decoding();

  it('should decode a valid document response', async () => {
    await decode.succeed(validDocumentResponse);
  });

  it('should reject a document response without a response', async () => {
    const { response: _response, ...noResponse } = validDocumentResponse;
    await decode.fail(noResponse, 'Missing key\n  at ["response"]');
  });

  it('should reject a document response without a line response array', async () => {
    const { lineResponse: _lineResponse, ...noLineResponse } = validDocumentResponse;
    await decode.fail(noLineResponse, 'Missing key\n  at ["lineResponse"]');
  });

  it('should decode a document response with no line responses', async () => {
    await decode.succeed({ ...validDocumentResponse, lineResponse: [] });
  });

  it('should reject a document response with an invalid response code', async () => {
    await decode.fail(
      { ...validDocumentResponse, response: { responseCode: 'ZZ' } },
      'Expected "AB" | "AP" | "RE"\n  at ["response"]["responseCode"]'
    );
  });

  it('should reject a line response without a line reference', async () => {
    await decode.fail(
      { ...validDocumentResponse, lineResponse: [{ response: lineResponse.response }] },
      'Missing key\n  at ["lineResponse"][0]["lineReference"]'
    );
  });
});
