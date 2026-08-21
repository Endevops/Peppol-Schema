import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-P0112',
  level: 'fatal',
  message: 'Invoice type code 326 or 384 are only allowed when both buyer and seller are German organizations ',
} as const satisfies SchematronRule;

const GERMAN_ONLY_CODES = new Set(['326', '384']);

export function validatePeppolEn16931P0112(document: PeppolDocument): SchematronRuleResult {
  const invoiceTypeCode = 'invoiceTypeCode' in document ? document.invoiceTypeCode : undefined;
  const creditNoteTypeCode = 'creditNoteTypeCode' in document ? document.creditNoteTypeCode : undefined;
  const code = invoiceTypeCode ?? creditNoteTypeCode;
  if (!code || !GERMAN_ONLY_CODES.has(code)) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, isSupplierGermany(document) && isCustomerGermany(document));
}
