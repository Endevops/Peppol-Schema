import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-026',
  level: 'warning',
  message:
    'If "Invoice type code" (BT-3) contains the code 384 (Corrected invoice), "PRECEDING INVOICE REFERENCE" (BG-3) should be provided at least once.',
} as const satisfies SchematronRule;

function evaluateDeR026(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const invoiceTypeCode = 'invoiceTypeCode' in document ? document.invoiceTypeCode : undefined;
  const creditNoteTypeCode = 'creditNoteTypeCode' in document ? document.creditNoteTypeCode : undefined;
  if (invoiceTypeCode !== '384' && creditNoteTypeCode !== '384') {
    return true;
  }
  const hasPrecedingInvoiceReference = (document.billingReferences?.length ?? 0) > 0;
  return hasPrecedingInvoiceReference;
}

export const validateDeR026 = schematronRule(rule, evaluateDeR026);
