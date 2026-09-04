import { Schema } from 'effect';

import type { ProcessesKeys } from '#/values/processes.generated';

import { processes } from '#/values/processes.generated';

/**
 * @description A PEPPOL business process identifier key as defined by the processes codelist.
 *
 * @see {@link processes}
 */
export type PeppolProcesses = `${ProcessesKeys}::${string}`;

/**
 * @description Validates a full PEPPOL business process identifier (`<scheme>::<value>`) against the known processes.
 *
 * @param error - The custom error message to use when validation fails. Defaults to `'invalid peppol process identifier'`.
 *
 * @returns An Effect schema that matches a valid `scheme::value` process identifier.
 *
 * @see {@link processes}
 */
export function processSchema(error = 'invalid peppol process identifier') {
  return Schema.String.check(
    Schema.makeFilter((val: string) => {
      const [prefix, suffix] = val.split('::');
      if (prefix === undefined || suffix === undefined) return false;
      const info = processes[prefix as ProcessesKeys];
      return info !== undefined && info.some(v => v === suffix);
    })
  ).annotate({ message: error });
}
