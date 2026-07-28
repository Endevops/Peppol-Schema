import * as z from 'zod/mini';

import { documentTypesProcessIds } from '#/values/document-type.generated';

import { processSchema } from '#/schemas/values/process-schema';
import type { PeppolDocumentType } from '#/schemas/values/document-type-schema';

export function processFromDocumentTypeSchema(documentType: PeppolDocumentType, error = 'invalid process type for document type') {
  const processes = documentTypesProcessIds[documentType as keyof typeof documentTypesProcessIds];
  if (!processes) {
    return processSchema(error);
  }
  return z
    .templateLiteral([z.string(), z.literal('::'), z.string()], error)
    .check(z.refine(val => processes.map(p => `${p.scheme}::${p.value}`).includes(val)));
}
