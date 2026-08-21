import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-007',
  level: 'fatal',
  message:
    '[NL-R-007] For suppliers in the Netherlands, the supplier MUST provide a means of payment (cac:PaymentMeans) if the payment is from customer to supplier',
} as const satisfies SchematronRule;

export function validateNlR007(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NL') {
    return schematronResult(rule, true);
  }
  const payable = document.legalMonetaryTotal.payableAmount.value;
  const isInvoice = 'invoiceLines' in document;
  const isCreditNote = 'creditNoteLines' in document;
  if ((isInvoice && payable <= 0) || (isCreditNote && payable >= 0)) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, (document.paymentMeans?.length ?? 0) > 0);
}
