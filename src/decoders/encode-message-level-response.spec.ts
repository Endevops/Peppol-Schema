import { afterEach, describe, expect, it, vi } from 'vitest';

import { encodeMessageLevelResponse } from './encode-message-level-response';

describe('encodeMessageLevelResponse', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const full = {
    customizationId: 'c',
    profileId: 'mlr',
    id: 'id',
    issueDate: 'd',
    issueTime: 't',
    senderParty: undefined,
    receiverParty: undefined,
    documentResponse: {
      response: { responseCode: '1', description: 'x' },
      documentReference: { id: 'D', documentTypeCode: 'X', versionId: '1' },
      lineResponse: [{ lineReference: { lineId: 'L' }, response: { responseCode: '1', description: 'y', status: { statusReasonCode: 'SR' } } }],
    },
  } as never;

  it('includes the schema location when MODE is test', () => {
    const out = encodeMessageLevelResponse(full) as { ApplicationResponse: Record<string, unknown> };
    expect(out.ApplicationResponse['@xsi:schemaLocation']).toContain('urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2');
  });

  it('omits the schema location when MODE is not test', () => {
    vi.stubEnv('MODE', 'production');
    const out = encodeMessageLevelResponse(full) as { ApplicationResponse: Record<string, unknown> };
    expect(out.ApplicationResponse['@xsi:schemaLocation']).toBeUndefined();
  });
});
