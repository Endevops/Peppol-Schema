import type { Brand } from 'effect';

import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import { processes } from '#/values/processes.generated';

export type PeppolProcesses = Brand.Branded<string, 'PeppolProcesses'>;

const entries = objectEntries(processes);

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
