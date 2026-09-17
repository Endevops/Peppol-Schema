/**
 * @description The default PEPPOL BIS Billing 3.0 customization identifier, which identifies the EN 16931 compliant billing rule set. Used as the decoding default
 * for the `customizationId` field of {@link PeppolBillingBase}.
 *
 * @example
 *   ```ts
 *   DEFAULT_CUSTOMIZATION_ID; // 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0'
 *   ```;
 */
export const DEFAULT_CUSTOMIZATION_ID = 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0' as const;
