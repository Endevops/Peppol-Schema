import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isCustomerGermany, isSupplierGermany, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-P0112',
  level: 'fatal',
  message: 'Invoice type code 326 or 384 are only allowed when both buyer and seller are German organizations ',
} as const satisfies SchematronRule;

const GERMAN_ONLY_CODES = new Set(['326', '384']);

function evaluatePeppolEn16931P0112(document: PeppolDocument): boolean {
  const invoiceTypeCode = 'invoiceTypeCode' in document ? document.invoiceTypeCode : undefined;
  const creditNoteTypeCode = 'creditNoteTypeCode' in document ? document.creditNoteTypeCode : undefined;
  const code = invoiceTypeCode ?? creditNoteTypeCode;
  if (!code || !GERMAN_ONLY_CODES.has(code)) {
    return true;
  }
  return isSupplierGermany(document) && isCustomerGermany(document);
}

export const validatePeppolEn16931P0112 = schematronRule(rule, evaluatePeppolEn16931P0112);
