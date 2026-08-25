import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { additionalDocumentReferenceCodesKeys } from '#/values/additional-document-reference-codes.generated';

/**
 * @description Additional document reference.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1153/
 * @see {@link additionalDocumentReferenceCodesKeys}
 */
export type AdditionalDocumentReference = Brand.Branded<string, 'AdditionalDocumentReference'>;

export function additionalDocumentReferenceCodeSchema(error?: string) {
  return z
    .string(error)
    .check(z.refine(val => additionalDocumentReferenceCodesKeys.includes(val as (typeof additionalDocumentReferenceCodesKeys)[number]), error));
}
