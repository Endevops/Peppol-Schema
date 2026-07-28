import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import { processes } from '#/values/processes.generated';

const entries = objectEntries(processes);

export function processXmlIdentifierSchema(error?: string) {
  return z.union(
    entries.map(([key, values]) =>
      z.object({ '#text': z.string().check(z.refine(val => values.includes(val))), '@scheme': z.string().check(z.refine(val => val === key)) })
    ),
    error ?? 'invalid Peppol document identifier'
  );
}
