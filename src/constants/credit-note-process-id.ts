import { processScheme } from '#/constants/process-scheme.ts';

/**
 * @description PEPPOL business process identifier for the billing process used by credit notes. It combines the {@link processScheme} scheme with the
 * `urn:fdc:peppol.eu:2017:poacc:billing:01:1.0` business process id, the same value used by {@link INVOICE_PROCESS_ID}.
 *
 * @example
 *   ```ts
 *   CREDIT_NOTE_PROCESS_ID; // 'cenbii-procid-ubl::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0'
 *   ```;
 */
export const CREDIT_NOTE_PROCESS_ID = `${processScheme}::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0` as const;
