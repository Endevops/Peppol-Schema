/**
 * @description Process scheme id for PEPPOL UBL business process identifiers. It forms the `<scheme>::` prefix of {@link INVOICE_PROCESS_ID},
 * {@link CREDIT_NOTE_PROCESS_ID}, {@link INVOICE_RESPONSE_PROCESS_ID}, and {@link MESSAGE_LEVEL_RESPONSE_PROCESS_ID}.
 *
 * @example
 *   ```ts
 *   processScheme; // 'cenbii-procid-ubl'
 *   ```;
 */
export const processScheme = 'cenbii-procid-ubl' as const;
