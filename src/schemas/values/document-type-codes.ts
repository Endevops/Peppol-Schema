import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { documentTypeCodesKeys } from '#/values/document-type-codes.generated';

export type DocumentTypeCode = Brand.Branded<string, 'DocumentTypeCode'>;

export function documentTypeCodeSchema(error?: string) {
  return z.string().check(z.refine(val => documentTypeCodesKeys.includes(val as (typeof documentTypeCodesKeys)[number]), error));
}
