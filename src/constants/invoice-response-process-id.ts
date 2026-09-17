import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id.ts';
import { processScheme } from '#/constants/process-scheme.ts';

/**
 * @description PEPPOL business process identifier for the invoice response process. It combines the {@link processScheme} scheme with
 * {@link INVOICE_RESPONSE_PROFILE_ID}, which is the `cbc:ProfileID` value fixed by {@link PeppolInvoiceResponse}.
 *
 * @example
 *   ```ts
 *   INVOICE_RESPONSE_PROCESS_ID; // 'cenbii-procid-ubl::urn:fdc:peppol.eu:poacc:bis:invoice_response:3'
 *   ```;
 */
export const INVOICE_RESPONSE_PROCESS_ID = `${processScheme}::${INVOICE_RESPONSE_PROFILE_ID}` as const;
