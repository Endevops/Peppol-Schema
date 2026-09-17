/**
 * @description Scheme id for PEPPOL document type identifiers. It forms the `<scheme>::` prefix of {@link INVOICE_DOCTYPE_ID}, {@link CREDIT_NOTE_DOCTYPE_ID},
 * {@link INVOICE_RESPONSE_DOCTYPE_ID}, and {@link MESSAGE_LEVEL_RESPONSE_DOCTYPE_ID}.
 *
 * @example
 *   ```ts
 *   documentScheme; // 'busdox-docid-qns'
 *   ```;
 */
export const documentScheme = 'busdox-docid-qns' as const;
