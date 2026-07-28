import { processesList } from '#/values/processes.generated';

import type { PeppolProcesses } from '#/schemas/values/process-schema';

export function isValidProcess(code: string): code is PeppolProcesses {
  return processesList.includes(code as any);
}
