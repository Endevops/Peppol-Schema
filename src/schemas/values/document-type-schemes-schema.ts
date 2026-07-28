import * as z from 'zod/mini';

import { documentTypesScheme } from '#/values/document-type.generated';

export function documentTypeSchemesSchema(error?: string) {
  return z.enum(documentTypesScheme, error ?? 'invalid Peppol document type scheme');
}
