import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import { type deprecatedprocesses, processes, type processesKey, processesList } from '#/values/processes.generated';

/**
 * @remarks
 *   The exclusion is only to avoid using deprecated values, but allow them to be parsed.
 *
 * @useDeclaredType
 */
export type PeppolProcesses = Exclude<z.infer<ReturnType<typeof processSchema>>, (typeof deprecatedprocesses)[number]>;
export type PeppolProcessesSchema = processesKey;

/**
 * @description Check if a given code is a valid processes.
 *
 * @param code The code to check.
 */
export function isValidProcess(code: string): code is PeppolProcesses {
  return processesList.includes(code as any);
}

const entries = objectEntries(processes);

/**
 * @description Schema for complete peppol process identifiers.
 *
 * @example
 *   ```
 *   cenbii-procid-ubl::urn:peppol:bis:billing
 *   ```;
 */
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

export function processXmlIdentifierSchema(error?: string) {
  return z.union(
    entries.map(([key, values]) =>
      z.object({ '#text': z.string().check(z.refine(val => values.includes(val))), '@scheme': z.string().check(z.refine(val => val === key)) })
    ),
    error ?? 'invalid Peppol document identifier'
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
