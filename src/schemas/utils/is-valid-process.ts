import type { PeppolProcesses } from '#/schemas/values/peppol-process-schema.ts';

import { processesList } from '#/values/processes.generated';

export function isValidProcess(code: string): code is PeppolProcesses {
  return processesList.includes(code);
}
