import { MESSAGE_LEVEL_RESPONSE_PROFILE_ID } from '#/constants/message-level-response-profile-id.ts';
import { processScheme } from '#/constants/process-scheme.ts';

/**
 * @description PEPPOL business process identifier for the message level response process. It combines the {@link processScheme} scheme with
 * {@link MESSAGE_LEVEL_RESPONSE_PROFILE_ID}, which is the `cbc:ProfileID` value fixed by {@link PeppolMessageLevelResponse}.
 *
 * @example
 *   ```ts
 *   MESSAGE_LEVEL_RESPONSE_PROCESS_ID; // 'cenbii-procid-ubl::urn:fdc:peppol.eu:poacc:bis:mlr:3'
 *   ```;
 */
export const MESSAGE_LEVEL_RESPONSE_PROCESS_ID = `${processScheme}::${MESSAGE_LEVEL_RESPONSE_PROFILE_ID}` as const;
