/**
 * @description PEPPOL profile id for the message level response, version 3. It is the `cbc:ProfileID` value fixed by {@link PeppolMessageLevelResponse} and is
 * matched when dispatching `ApplicationResponse` documents to that schema.
 *
 * @example
 *   ```ts
 *   MESSAGE_LEVEL_RESPONSE_PROFILE_ID; // 'urn:fdc:peppol.eu:poacc:bis:mlr:3'
 *   ```;
 */
export const MESSAGE_LEVEL_RESPONSE_PROFILE_ID = 'urn:fdc:peppol.eu:poacc:bis:mlr:3' as const;
