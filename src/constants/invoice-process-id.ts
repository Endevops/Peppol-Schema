import { processScheme } from '#/constants/process-scheme.ts';

/**
 * @description PEPPOL business process identifier for the billing process. It combines the {@link processScheme} scheme with the
 * `urn:fdc:peppol.eu:2017:poacc:billing:01:1.0` business process id, which is the `cbc:ProfileID` value defaulted by the billing document schemas
 * such as {@link PeppolInvoice}.
 *
 * @example
 *   ```ts
 *   INVOICE_PROCESS_ID; // 'cenbii-procid-ubl::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0'
 *   ```;
 */
export const INVOICE_PROCESS_ID = `${processScheme}::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0` as const;
