import * as z from 'zod/mini';

import type { PeppolDocumentTypeSchema } from '#/schemas/values/document-type-schema';

import { processSchema } from '#/schemas/values/process-schema';
import { documentTypesProcessIds } from '#/values/document-type.generated';

export function processFromDocumentTypeSchema(documentType: PeppolDocumentTypeSchema, error = 'invalid process type for document type') {
  const processes = documentTypesProcessIds[documentType as keyof typeof documentTypesProcessIds];
  if (!processes) {
    return processSchema(error);
  }

  return z
    .templateLiteral([z.string(), z.literal('::'), z.string()], error)
    .check(z.refine(val => processes.map(p => `${p.scheme}::${p.value}`).includes(val)));
}
