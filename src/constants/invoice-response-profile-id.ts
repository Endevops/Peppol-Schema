/**
 * @description PEPPOL profile id for the invoice response, version 3. It is the `cbc:ProfileID` value fixed by {@link PeppolInvoiceResponse} and is matched when
 * dispatching `ApplicationResponse` documents to that schema.
 *
 * @example
 *   ```ts
 *   INVOICE_RESPONSE_PROFILE_ID; // 'urn:fdc:peppol.eu:poacc:bis:invoice_response:3'
 *   ```;
 */
export const INVOICE_RESPONSE_PROFILE_ID = 'urn:fdc:peppol.eu:poacc:bis:invoice_response:3' as const;
