import { describe, expect, it } from 'vitest';

import { CREDIT_NOTE_DOCTYPE_ID } from './credit-note-doctype-id';
import { CREDIT_NOTE_PROCESS_ID } from './credit-note-process-id';
import { INVOICE_PROCESS_ID } from './invoice-process-id';
import { INVOICE_RESPONSE_DOCTYPE_ID } from './invoice-response-doctype-id';
import { INVOICE_RESPONSE_PROCESS_ID } from './invoice-response-process-id';
import { MESSAGE_LEVEL_RESPONSE_DOCTYPE_ID } from './message-level-response-doctype-id';
import { MESSAGE_LEVEL_RESPONSE_PROCESS_ID } from './message-level-response-process-id';
import { participantScheme } from './participant-scheme';
import { processScheme } from './process-scheme';
import { transportProfile } from './transport-profile';

describe('constants', () => {
  it('defines the document type ids', () => {
    expect(CREDIT_NOTE_DOCTYPE_ID).toBe(
      'busdox-docid-qns::urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2::CreditNote##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1'
    );
    expect(INVOICE_RESPONSE_DOCTYPE_ID).toBe(
      'busdox-docid-qns::urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2::ApplicationResponse##urn:fdc:peppol.eu:poacc:trns:invoice_response:3::2.1'
    );
    expect(MESSAGE_LEVEL_RESPONSE_DOCTYPE_ID).toBe(
      'busdox-docid-qns::urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2::ApplicationResponse##urn:fdc:peppol.eu:poacc:trns:mlr:3::2.1'
    );
  });

  it('defines the process ids', () => {
    expect(CREDIT_NOTE_PROCESS_ID).toBe('cenbii-procid-ubl::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0');
    expect(INVOICE_PROCESS_ID).toBe('cenbii-procid-ubl::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0');
    expect(INVOICE_RESPONSE_PROCESS_ID).toBe('cenbii-procid-ubl::urn:fdc:peppol.eu:poacc:bis:invoice_response:3');
    expect(MESSAGE_LEVEL_RESPONSE_PROCESS_ID).toBe('cenbii-procid-ubl::urn:fdc:peppol.eu:poacc:bis:mlr:3');
  });

  it('defines the scheme and transport profiles', () => {
    expect(participantScheme).toBe('iso6523-actorid-upis');
    expect(processScheme).toBe('cenbii-procid-ubl');
    expect(transportProfile).toBe('peppol-transport-as4-v2_0');
  });
});
