import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'NL-R-007',
  level: 'fatal',
  message:
    '[NL-R-007] For suppliers in the Netherlands, the supplier MUST provide a means of payment (cac:PaymentMeans) if the payment is from customer to supplier',
} as const satisfies SchematronRule;

function evaluateNlR007(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NL') {
    return true;
  }
  const payable = document.legalMonetaryTotal.payableAmount.value;
  const isInvoice = 'invoiceLines' in document;
  const isCreditNote = 'creditNoteLines' in document;
  if ((isInvoice && payable <= 0) || (isCreditNote && payable >= 0)) {
    return true;
  }
  return (document.paymentMeans?.length ?? 0) > 0;
}

export const validateNlR007 = schematronRule(rule, evaluateNlR007);
