import * as z from 'zod/mini';

import type { PeppolDocumentTypeSchema } from '#/schemas/values/document-type-schema';

import { processSchema } from '#/schemas/values/process-schema';
import { documentTypesProcessIds } from '#/values/document-type.generated';

/**
 * @description Validates a business process identifier (`<scheme>::<value>`) against the processes allowed for a given document type.
 *
 * @param documentType - The PEPPOL document type scheme whose allowed processes should be used.
 * @param error - The custom error message to use when validation fails. Defaults to `'invalid process type for document type'`.
 *
 * @returns A Zod template-literal schema that matches only processes allowed for the given document type.
 *
 * @see {@link processSchema}
 * @see {@link documentTypesProcessIds}
 */
export function processFromDocumentTypeSchema(documentType: PeppolDocumentTypeSchema, error = 'invalid process type for document type') {
  const processes = documentTypesProcessIds[documentType as keyof typeof documentTypesProcessIds];
  if (!processes) {
    return processSchema(error);
  }

  return z
    .templateLiteral([z.string(), z.literal('::'), z.string()], error)
    .check(z.refine(val => processes.map(p => `${p.scheme}::${p.value}`).includes(val)));
}
