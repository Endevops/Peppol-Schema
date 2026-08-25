import { MESSAGE_LEVEL_RESPONSE_PROFILE_ID } from '#/constants/message-level-response-profile-id';
import { processScheme } from '#/constants/process-scheme';

export const MESSAGE_LEVEL_RESPONSE_PROCESS_ID = `${processScheme}::${MESSAGE_LEVEL_RESPONSE_PROFILE_ID}` as const;
