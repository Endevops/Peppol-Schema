import type { PeppolDocumentType } from '#/schemas/values/document-type';
import type { PeppolProcesses } from '#/schemas/values/process-codes';

/**
 * @description The participant scheme used in the SMP (Service Metadata Publisher) context.
 */
export const participantScheme = 'iso6523-actorid-upis' as const;
/**
 * @description The document scheme used in the SMP (Service Metadata Publisher) context.
 */
export const documentScheme = 'busdox-docid-qns' as const;
/**
 * @description The process scheme used in the SMP (Service Metadata Publisher) context.
 */
export const processScheme = 'cenbii-procid-ubl' as const;
/**
 * @description The transport profile used in the SMP (Service Metadata Publisher) context.
 */
export const transportProfile = 'peppol-transport-as4-v2_0' as const;

export const MESSAGE_LEVEL_RESPONSE_PROFILE_ID = 'urn:fdc:peppol.eu:poacc:bis:mlr:3' as const;
export const MESSAGE_LEVEL_RESPONSE_DOCTYPE_ID =
  `${documentScheme}::urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2::ApplicationResponse##urn:fdc:peppol.eu:poacc:trns:mlr:3::2.1` as const satisfies PeppolDocumentType;
export const MESSAGE_LEVEL_RESPONSE_PROCESS_ID = `${processScheme}::${MESSAGE_LEVEL_RESPONSE_PROFILE_ID}` as const satisfies PeppolProcesses;

export const INVOICE_RESPONSE_PROFILE_ID = 'urn:fdc:peppol.eu:poacc:bis:invoice_response:3' as const;
export const INVOICE_RESPONSE_PROCESS_ID = `${processScheme}::${INVOICE_RESPONSE_PROFILE_ID}` as const satisfies PeppolProcesses;
/**
 * @description Default doctype for an {@link PeppolInvoiceResponse}
 */
export const INVOICE_RESPONSE_DOCTYPE_ID =
  `${documentScheme}::urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2::ApplicationResponse##urn:fdc:peppol.eu:poacc:trns:invoice_response:3::2.1` as const satisfies PeppolDocumentType;
export const INVOICE_DOCTYPE_ID =
  `${documentScheme}::urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1` as const satisfies PeppolDocumentType;
export const INVOICE_PROCESS_ID = `${processScheme}::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0` as const satisfies PeppolProcesses;
export const CREDIT_NOTE_DOCTYPE_ID =
  `${documentScheme}::urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2::CreditNote##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1` as const satisfies PeppolDocumentType;
export const CREDIT_NOTE_PROCESS_ID = `${processScheme}::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0` as const satisfies PeppolProcesses;
