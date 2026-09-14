import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'NL-R-001',
  level: 'fatal',
  message:
    '[NL-R-001] For suppliers in the Netherlands, if the document is a creditnote, the document MUST contain an invoice reference (cac:BillingReference/cac:InvoiceDocumentReference/cbc:ID)',
} as const satisfies SchematronRule;

function evaluateNlR001(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NL' || !('creditNoteTypeCode' in document)) {
    return true;
  }
  const invoiceReference = document.billingReferences?.some(ref => Boolean(ref.invoiceDocumentReference.id));
  return Boolean(invoiceReference);
}

export const validateNlR001 = schematronRule(rule, evaluateNlR001);
