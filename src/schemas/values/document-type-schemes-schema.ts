import * as z from 'zod/mini';

import { documentTypesScheme } from '#/values/document-type.generated';

export function documentTypeSchemesSchema(error = 'invalid Peppol document type scheme') {
  return z.string(error).check(z.refine(val => documentTypesScheme.includes(val), error));
}
