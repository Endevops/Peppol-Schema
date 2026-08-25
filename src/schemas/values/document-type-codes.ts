import * as z from 'zod/mini';

import type { DocumentTypeCodesKeys } from '#/values/document-type-codes.generated';

import { documentTypeCodesKeys } from '#/values/document-type-codes.generated';

export type DocumentTypeCode = DocumentTypeCodesKeys;

export function documentTypeCodeSchema(error?: string) {
  return z.string().check(z.refine(val => documentTypeCodesKeys.includes(val as never), error));
}
