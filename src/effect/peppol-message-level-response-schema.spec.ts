import { DateTime } from 'effect';
// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolMessageLevelResponseSchema } from './peppol-message-level-response-schema';

const lineResponse = {
  lineReference: { lineId: '/Catalogue/cac:CatalogueLine[3]' },
  response: { responseCode: 'RE', description: 'Validation gives error', status: { statusReasonCode: 'BV' } },
} as const;

const validMessageLevelResponse = {
  customizationId: 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
  documentResponse: {
    documentReference: { documentTypeCode: '9', id: 'EnvelopeID-12456789', versionId: '2' },
    lineResponse: [lineResponse],
    response: { description: 'Rejected due to validation errors', responseCode: 'RE' },
  },
  id: 'MLR-ID123',
  issueDate: '2016-08-15',
  issueTime: '12:00:00',
  profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
  receiverParty: { endpointId: { id: '7315458756328', schemeId: '0088' } },
  senderParty: { endpointId: { id: '7300010000001', schemeId: '0088' } },
} as const;

describe('peppolMessageLevelResponseSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolMessageLevelResponseSchema);
  const decode = testSchema.decoding();

  it('should decode a valid message level response', async () => {
    await decode.succeed(validMessageLevelResponse, {
      customizationId: 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
      documentResponse: {
        documentReference: { documentTypeCode: '9', id: 'EnvelopeID-12456789', versionId: '2' },
        lineResponse: [lineResponse],
        response: { description: 'Rejected due to validation errors', responseCode: 'RE' },
      },
      id: 'MLR-ID123',
      issueDate: DateTime.makeUnsafe('2016-08-15'),
      issueTime: '12:00:00',
      profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
      receiverParty: { endpointId: { id: '7315458756328', schemeId: '0088' } },
      senderParty: { endpointId: { id: '7300010000001', schemeId: '0088' } },
    });
  });

  it('should decode a message level response without optional issue time', async () => {
    const { issueTime: _issueTime, ...withoutIssueTime } = validMessageLevelResponse;
    await decode.succeed(withoutIssueTime, {
      customizationId: 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
      documentResponse: {
        documentReference: { documentTypeCode: '9', id: 'EnvelopeID-12456789', versionId: '2' },
        lineResponse: [lineResponse],
        response: { description: 'Rejected due to validation errors', responseCode: 'RE' },
      },
      id: 'MLR-ID123',
      issueDate: DateTime.makeUnsafe('2016-08-15'),
      profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
      receiverParty: { endpointId: { id: '7315458756328', schemeId: '0088' } },
      senderParty: { endpointId: { id: '7300010000001', schemeId: '0088' } },
    });
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
      'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}Z?$\n  at ["issueDate"]'
    );
  });
});
