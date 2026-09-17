/**
 * @description The default PEPPOL BIS Billing 3.0 profile identifier, which identifies the billing process the document follows. Used as the decoding default for
 * the `profileId` field of {@link PeppolBillingBase}.
 *
 * @example
 *   ```ts
 *   DEFAULT_PROFILE_ID; // 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0'
 *   ```;
 */
export const DEFAULT_PROFILE_ID = 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0' as const;
