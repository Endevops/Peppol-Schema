import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-017',
  level: 'warning',
  message:
    'The element "Invoice type code" (BT-3) should only contain the following values from code list UNTDID 1001: 326 (Partial invoice), 380 (Commercial invoice), 384 (Corrected invoice), 389 (Self-billed invoice), 381 (Credit note), 875 (Partial construction invoice), 876 (Partial final construction invoice), 877 (Final construction invoice).',
} as const satisfies SchematronRule;

const ALLOWED_CODES = new Set(['326', '380', '384', '389', '381', '875', '876', '877']);

function evaluateDeR017(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const code = 'invoiceTypeCode' in document ? document.invoiceTypeCode : 'creditNoteTypeCode' in document ? document.creditNoteTypeCode : undefined;
  return code === undefined || ALLOWED_CODES.has(code);
}

export const validateDeR017 = schematronRule(rule, evaluateDeR017);
