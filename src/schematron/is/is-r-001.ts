import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-001',
  level: 'warning',
  message: '[IS-R-001]-If seller is icelandic then invoice type should be 380 or 381',
} as const satisfies SchematronRule;

const ALLOWED_CODES = new Set(['380', '381']);

function evaluateIsR001(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS') {
    return true;
  }
  const code = 'invoiceTypeCode' in document ? document.invoiceTypeCode : 'creditNoteTypeCode' in document ? document.creditNoteTypeCode : undefined;
  return code !== undefined && !code.includes(' ') && ALLOWED_CODES.has(code);
}

export const validateIsR001 = schematronRule(rule, evaluateIsR001);
