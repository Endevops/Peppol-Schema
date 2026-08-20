import { afterEach, describe, expect, it, vi } from 'vitest';

import { encodeInvoiceResponse } from './encode-invoice-response';

describe('encodeInvoiceResponse', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const full = {
    customizationId: 'c',
    profileId: 'p',
    id: 'id',
    issueDate: 'd',
    issueTime: 't',
    note: 'n',
    senderParty: undefined,
    receiverParty: undefined,
    documentResponse: {
      response: {
        responseCode: '1',
        effectiveDate: 'd',
        status: [{ statusReasonCode: { value: 'SR', listId: 'L' }, statusReason: 'r', condition: [{ attributeId: 'a', description: 'd' }] }],
      },
      documentReference: { id: 'D', issueDate: 'd', documentTypeCode: 'X' },
    },
  } as never;

  it('includes the schema location when MODE is test', () => {
    const out = encodeInvoiceResponse(full) as { ApplicationResponse: Record<string, unknown> };
    expect(out.ApplicationResponse['@xsi:schemaLocation']).toContain('urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2');
  });

  it('omits the schema location when MODE is not test', () => {
    vi.stubEnv('MODE', 'production');
    const out = encodeInvoiceResponse(full) as { ApplicationResponse: Record<string, unknown> };
    expect(out.ApplicationResponse['@xsi:schemaLocation']).toBeUndefined();
  });

  it('returns undefined for a missing documentResponse', () => {
    const out = encodeInvoiceResponse({ customizationId: 'c' } as never) as { ApplicationResponse: { 'cac:DocumentResponse': unknown } };
    expect(out.ApplicationResponse['cac:DocumentResponse']).toBeUndefined();
  });

  it('returns undefined for a missing documentReference', () => {
    const out = encodeInvoiceResponse({
      ...full,
      documentResponse: { response: { responseCode: '1', effectiveDate: 'd', status: undefined } },
    } as never) as { ApplicationResponse: { 'cac:DocumentResponse': { 'cac:DocumentReference': unknown } } };
    expect(out.ApplicationResponse['cac:DocumentResponse']['cac:DocumentReference']).toBeUndefined();
  });
});
