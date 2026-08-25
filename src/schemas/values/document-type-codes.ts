import * as z from 'zod/mini';

import type { DocumentTypeCodesKeys } from '#/values/document-type-codes.generated';

import { documentTypeCodesKeys } from '#/values/document-type-codes.generated';

/**
 * @description A document type code as defined by the PEPPOL subset of UNCL 1001 (document/message name code).
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001/
 */
export type DocumentTypeCode = DocumentTypeCodesKeys;

/**
 * @description Validates a document type code against the PEPPOL subset of UNCL 1001.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns A Zod string schema that accepts only valid document type codes.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001/
 */
export function documentTypeCodeSchema(error?: string) {
  return z.string().check(z.refine(val => documentTypeCodesKeys.includes(val as never), error));
}
