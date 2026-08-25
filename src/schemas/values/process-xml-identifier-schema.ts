import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import { processes } from '#/values/processes.generated';

const entries = /* @__PURE__ */ objectEntries(processes);

/**
 * @description Validates a raw XML process identifier object with `#text` and `@scheme` fields against the known processes.
 *
 * @param error - The custom error message to use when validation fails. Defaults to `'invalid Peppol document identifier'`.
 *
 * @returns A Zod union schema accepting objects whose `#text` value is valid for the given `@scheme`.
 *
 * @see {@link processes}
 */
export function processXmlIdentifierSchema(error: string = 'invalid Peppol document identifier') {
  return z.union(
    entries.map(([key, values]) =>
      z.object({
        '#text': z.string().check(z.refine(val => values.includes(val as never))),
        '@scheme': z.string().check(z.refine(val => val === key)),
      })
    ),
    error
  );
}
