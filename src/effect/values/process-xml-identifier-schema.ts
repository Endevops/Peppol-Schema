import { Schema } from 'effect';

import { processes } from '#/values/processes.generated';

function processXmlMember(scheme: string, values: Array<string>) {
  return Schema.Struct({ '#text': Schema.String.check(Schema.makeFilter((val: string) => values.includes(val))), '@scheme': Schema.Literal(scheme) });
}

/**
 * @description Validates a raw XML process identifier object with `#text` and `@scheme` fields against the known processes.
 *
 * @param error - The custom error message to use when validation fails. Defaults to `'invalid Peppol document identifier'`.
 *
 * @returns An Effect union schema accepting objects whose `#text` value is valid for the given `@scheme`.
 *
 * @see {@link processes}
 */
export function processXmlIdentifierSchema(error: string = 'invalid Peppol document identifier') {
  const members = Object.entries(processes).map(([scheme, values]) => processXmlMember(scheme, values));
  return Schema.Union(members as [(typeof members)[number], ...Array<(typeof members)[number]>]).annotate({ message: error });
}
