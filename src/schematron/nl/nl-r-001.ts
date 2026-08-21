import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-001',
  level: 'fatal',
  message:
    '[NL-R-001] For suppliers in the Netherlands, if the document is a creditnote, the document MUST contain an invoice reference (cac:BillingReference/cac:InvoiceDocumentReference/cbc:ID)',
} as const satisfies SchematronRule;

export function validateNlR001(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NL' || !('creditNoteTypeCode' in document)) {
    return schematronResult(rule, true);
  }
  const invoiceReference = document.billingReferences?.some(ref => Boolean(ref.invoiceDocumentReference.id));
  return schematronResult(rule, Boolean(invoiceReference));
}
