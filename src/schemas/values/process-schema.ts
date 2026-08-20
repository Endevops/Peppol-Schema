import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import { processes, processesList } from '#/values/processes.generated';
import type { deprecatedprocesses, processesKey } from '#/values/processes.generated';

export type PeppolProcesses = Exclude<z.infer<ReturnType<typeof processSchema>>, (typeof deprecatedprocesses)[number]>;
export type PeppolProcessesSchema = processesKey;

const entries = objectEntries(processes);

export function processSchema(error = 'invalid peppol process identifier') {
  return z
    .templateLiteral([z.string().check(z.refine(val => entries.some(([code]) => val.startsWith(code)))), z.literal('::'), z.string()], error)
    .check(
      z.refine(val => {
        const [prefix, suffix] = val.split('::') as [string, string];
        return entries.filter(([code]) => code === prefix).some(([, info]) => info.some(v => v === suffix));
      })
    );
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('process', () => {
    it.each(processesList.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(processSchema().parse(value)).toEqual(expected);
    });
  });
}
