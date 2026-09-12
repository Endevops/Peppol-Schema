import { Effect } from 'effect';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { encodeMessageLevelResponse } from './encode-message-level-response';

describe('encodeMessageLevelResponse', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const full = {
    customizationId: 'c',
    documentResponse: {
      documentReference: { documentTypeCode: 'X', id: 'D', versionId: '1' },
      lineResponse: [{ lineReference: { lineId: 'L' }, response: { responseCode: '1', description: 'y', status: { statusReasonCode: 'SR' } } }],
      response: { description: 'x', responseCode: '1' },
    },
    id: 'id',
    issueDate: 'd',
    issueTime: 't',
    profileId: 'mlr',
    receiverParty: undefined,
    senderParty: undefined,
  } as never;

  it('includes the schema location when MODE is test', () => {
    const out = Effect.runSync(encodeMessageLevelResponse(full)) as { ApplicationResponse: Record<string, unknown> };
    expect(out.ApplicationResponse['@xsi:schemaLocation']).toContain('urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2');
  });

  it('omits the schema location when MODE is not test', () => {
    vi.stubEnv('MODE', 'production');
    const out = Effect.runSync(encodeMessageLevelResponse(full)) as { ApplicationResponse: Record<string, unknown> };
    expect(out.ApplicationResponse['@xsi:schemaLocation']).toBeUndefined();
  });
});
