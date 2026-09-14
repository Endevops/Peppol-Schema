import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getCustomerCountry, getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'NL-R-008',
  level: 'fatal',
  message:
    '[NL-R-008] For suppliers in the Netherlands, if the customer is in the Netherlands, the payment means code (cac:PaymentMeans/cbc:PaymentMeansCode) MUST be one of 30, 48, 49, 57, 58 or 59',
} as const satisfies SchematronRule;

const ALLOWED_CODES = new Set(['30', '48', '49', '57', '58', '59']);

function evaluateNlR008(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NL' || getCustomerCountry(document) !== 'NL') {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => ALLOWED_CODES.has(payment.paymentMeansCode.code));
  return passed;
}

export const validateNlR008 = schematronRule(rule, evaluateNlR008);
