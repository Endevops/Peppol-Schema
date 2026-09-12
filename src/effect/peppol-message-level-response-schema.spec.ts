// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolMessageLevelResponseSchema } from './peppol-message-level-response-schema';

const lineResponse = {
  lineReference: { lineId: '/Catalogue/cac:CatalogueLine[3]' },
  response: { responseCode: 'RE', description: 'Validation gives error', status: { statusReasonCode: 'BV' } },
};

const validMessageLevelResponse = {
  customizationId: 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
  profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
  id: 'MLR-ID123',
  issueDate: '2016-08-15',
  issueTime: '12:00:00',
  senderParty: { endpointId: { id: '7300010000001', schemeId: '0088' } },
  receiverParty: { endpointId: { id: '7315458756328', schemeId: '0088' } },
  documentResponse: {
    response: { responseCode: 'RE', description: 'Rejected due to validation errors' },
    documentReference: { id: 'EnvelopeID-12456789', documentTypeCode: '9', versionId: '2' },
    lineResponse: [lineResponse],
  },
};

describe('peppolMessageLevelResponseSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolMessageLevelResponseSchema);
  const decode = testSchema.decoding();

  it('should decode a valid message level response', async () => {
    await decode.succeed(validMessageLevelResponse);
  });

  it('should decode a message level response without optional issue time', async () => {
    const { issueTime: _issueTime, ...withoutIssueTime } = validMessageLevelResponse;
    await decode.succeed(withoutIssueTime);
  });

  it('should reject a message level response without required id', async () => {
    const { id: _id, ...noId } = validMessageLevelResponse;
    await decode.fail(noId, 'Missing key\n  at ["id"]');
  });

  it('should reject a message level response with an invalid profile id', async () => {
    await decode.fail(
      { ...validMessageLevelResponse, profileId: 'urn:not:valid' },
      'Expected "urn:fdc:peppol.eu:poacc:bis:mlr:3"\n  at ["profileId"]'
    );
  });

  it('should reject a message level response with an invalid issue time', async () => {
    await decode.fail({ ...validMessageLevelResponse, issueTime: '25:00:00' }, 'Invalid ISO time\n  at ["issueTime"]');
  });

  it('should reject a message level response with an invalid issue date', async () => {
    await decode.fail(
      { ...validMessageLevelResponse, issueDate: 'not-a-date' },
      'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}$\n  at ["issueDate"]'
    );
  });
});
