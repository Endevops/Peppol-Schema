import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id.ts';
import { processScheme } from '#/constants/process-scheme.ts';

export const INVOICE_RESPONSE_PROCESS_ID = `${processScheme}::${INVOICE_RESPONSE_PROFILE_ID}` as const;
