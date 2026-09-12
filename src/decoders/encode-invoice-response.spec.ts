import { Effect } from 'effect';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { encodeInvoiceResponse } from './encode-invoice-response';

describe('encodeInvoiceResponse', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const full = {
    customizationId: 'c',
    documentResponse: {
      documentReference: { documentTypeCode: 'X', id: 'D', issueDate: 'd' },
      response: {
        effectiveDate: 'd',
        responseCode: '1',
        status: [{ statusReasonCode: { value: 'SR', listId: 'L' }, statusReason: 'r', condition: [{ attributeId: 'a', description: 'd' }] }],
      },
    },
    id: 'id',
    issueDate: 'd',
    issueTime: 't',
    note: 'n',
    profileId: 'p',
    receiverParty: undefined,
    senderParty: undefined,
  } as any;

  it('includes the schema location when MODE is test', () => {
    const out = Effect.runSync(encodeInvoiceResponse(full)) as { ApplicationResponse: Record<string, unknown> };
    expect(out.ApplicationResponse['@xsi:schemaLocation']).toContain('urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2');
  });

  it('omits the schema location when MODE is not test', () => {
    vi.stubEnv('MODE', 'production');
    const out = Effect.runSync(encodeInvoiceResponse(full)) as { ApplicationResponse: Record<string, unknown> };
    expect(out.ApplicationResponse['@xsi:schemaLocation']).toBeUndefined();
  });

  it('returns undefined for a missing documentResponse', () => {
    const out = Effect.runSync(encodeInvoiceResponse({ customizationId: 'c' } as any)) as {
      ApplicationResponse: { 'cac:DocumentResponse': unknown };
    };
    expect(out.ApplicationResponse['cac:DocumentResponse']).toBeUndefined();
  });

  it('returns undefined for a missing documentReference', () => {
    const out = Effect.runSync(
      encodeInvoiceResponse({ ...full, documentResponse: { response: { responseCode: '1', effectiveDate: 'd', status: undefined } } } as never)
    ) as { ApplicationResponse: { 'cac:DocumentResponse': { 'cac:DocumentReference': unknown } } };
    expect(out.ApplicationResponse['cac:DocumentResponse']['cac:DocumentReference']).toBeUndefined();
  });
});
