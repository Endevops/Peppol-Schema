import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import type { ProcessesKeys } from '#/values/processes.generated';

import { processes } from '#/values/processes.generated';

/**
 * @description A PEPPOL business process identifier key as defined by the processes codelist.
 *
 * @see {@link processes}
 */
export type PeppolProcesses = `${ProcessesKeys}::${string}`;

const entries = /* @__PURE__ */ objectEntries(processes);

/**
 * @description Validates a full PEPPOL business process identifier (`<scheme>::<value>`) against the known processes.
 *
 * @param error - The custom error message to use when validation fails. Defaults to `'invalid peppol process identifier'`.
 *
 * @returns A Zod template-literal schema that matches a valid `scheme::value` process identifier.
 *
 * @see {@link processes}
 */
export function processSchema(error = 'invalid peppol process identifier') {
  return z
    .templateLiteral(
      // NOTE: zod's template-literal segments are matched structurally, so a
      // `.check(z.refine(...))` on a segment would never run. The scheme prefix
      // is validated against the whole identifier by the check below instead.
      [z.string(), z.literal('::'), z.string()],
      error
    )
    .check(
      z.refine(val => {
        const [prefix, suffix] = val.split('::') as [string, string];
        return entries.filter(([code]) => code === prefix).some(([, info]) => info.some(v => v === suffix));
      })
    );
}
