import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-026',
  level: 'warning',
  message:
    'If "Invoice type code" (BT-3) contains the code 384 (Corrected invoice), "PRECEDING INVOICE REFERENCE" (BG-3) should be provided at least once.',
} as const satisfies SchematronRule;

export function validateDeR026(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const invoiceTypeCode = 'invoiceTypeCode' in document ? document.invoiceTypeCode : undefined;
  const creditNoteTypeCode = 'creditNoteTypeCode' in document ? document.creditNoteTypeCode : undefined;
  if (invoiceTypeCode !== '384' && creditNoteTypeCode !== '384') {
    return schematronResult(rule, true);
  }
  const hasPrecedingInvoiceReference = (document.billingReferences?.length ?? 0) > 0;
  return schematronResult(rule, hasPrecedingInvoiceReference);
}
