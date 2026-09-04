import { Schema } from 'effect';

import { documentTypesScheme } from '#/values/document-type.generated';

/**
 * @description Validates a PEPPOL document type scheme (e.g. `busdox-docid-qns`, `peppol-doctype-wildcard`).
 *
 * @param error - The error message to use when validation fails. Defaults to `'invalid Peppol document type scheme'`.
 *
 * @returns An Effect schema that accepts only valid document type schemes.
 *
 * @see {@link documentTypesScheme}
 */
export function documentTypeSchemesSchema(error = 'invalid Peppol document type scheme') {
  return Schema.Literals(documentTypesScheme as [string, ...Array<string>]).annotate({ message: error });
}
