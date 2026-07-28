import type { PeppolProcesses } from '#/schemas/values/process-schema';

import { processScheme } from '#/constants/process-scheme';

export const CREDIT_NOTE_PROCESS_ID = `${processScheme}::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0` as const satisfies PeppolProcesses;
