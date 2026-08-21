import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-001',
  level: 'warning',
  message: '[IS-R-001]-If seller is icelandic then invoice type should be 380 or 381',
} as const satisfies SchematronRule;

const ALLOWED_CODES = new Set(['380', '381']);

export function validateIsR001(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const code = 'invoiceTypeCode' in document ? document.invoiceTypeCode : 'creditNoteTypeCode' in document ? document.creditNoteTypeCode : undefined;
  return schematronResult(rule, code !== undefined && !code.includes(' ') && ALLOWED_CODES.has(code));
}
