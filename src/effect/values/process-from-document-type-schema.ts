import { Schema } from 'effect';

import type { PeppolDocumentType } from '#/effect/values/document-type-schema';

import { processSchema } from '#/effect/values/process-schema';
import { documentTypesProcessIds } from '#/values/document-type.generated';

/**
 * @description Validates a business process identifier (`<scheme>::<value>`) against the processes allowed for a given document type.
 *
 * @param documentType - The PEPPOL document type scheme whose allowed processes should be used.
 * @param error - The custom error message to use when validation fails. Defaults to `'invalid process type for document type'`.
 *
 * @returns An Effect schema that matches only processes allowed for the given document type.
 *
 * @see {@link processSchema}
 * @see {@link documentTypesProcessIds}
 */
export function processFromDocumentTypeSchema(documentType: PeppolDocumentType, error = 'invalid process type for document type') {
  const allowed = documentTypesProcessIds[documentType as keyof typeof documentTypesProcessIds];
  if (allowed === undefined) {
    return processSchema(error);
  }
  const values = allowed.map(p => `${p.scheme}::${p.value}`);
  return Schema.String.check(Schema.makeFilter((val: string) => values.includes(val as never))).annotate({ message: error });
}
