import type { PeppolProcesses } from '#/schemas/values/peppol-process-schema.ts';

import { processesList } from '#/values/processes.generated';

/**
 * @description Type guard for PEPPOL business process identifiers of the form `<scheme>::<value>`.
 *
 * @example
 *   ```ts
 *   isValidProcess('cenbii-procid-ubl::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0'); // true
 *   isValidProcess('cenbii-procid-ubl::urn:not:a:process'); // false
 *   ```;
 *
 * @param code - The process identifier to test.
 *
 * @returns `true` when `code` appears in {@link processesList}, narrowing it to {@link PeppolProcesses}; otherwise `false`.
 */
export function isValidProcess(code: string): code is PeppolProcesses {
  return processesList.includes(code);
}
