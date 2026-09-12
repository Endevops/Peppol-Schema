import { Record } from 'effect';
import * as z from 'zod/mini';

import { documentTypesTable } from '#/values/document-type.generated';

const entries = /* @__PURE__ */ Record.toEntries(documentTypesTable);

/**
 * @description Validates the value part of a PEPPOL document type identifier (the portion after the scheme prefix) against the known document type table.
 *
 * @param error - The error message to use when validation fails. Defaults to `'invalid Peppol document type value'`.
 *
 * @returns A Zod string schema that accepts only valid document type values.
 *
 * @see {@link documentTypesTable}
 */
export function documentTypeValuesSchema(error = 'invalid Peppol document type value') {
  return z.string(error).check(z.refine(val => entries.flatMap(([, value]) => value).includes(val as never)));
}
