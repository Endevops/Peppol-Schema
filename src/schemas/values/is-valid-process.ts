import type { PeppolProcesses } from '#/schemas/values/process-schema';

import { processesList } from '#/values/processes.generated';

export function isValidProcess(code: string): code is PeppolProcesses {
  return processesList.includes(code as any);
}
