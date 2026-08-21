import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-024-1',
  level: 'fatal',
  message:
    'If "Payment means type code" (BT-81) contains a code for payment card (48, 54, 55), "PAYMENT CARD INFORMATION" (BG-18) shall be provided.',
} as const satisfies SchematronRule;

const CARD_CODES = new Set(['48', '54', '55']);

export function validateDeR024_1(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!CARD_CODES.has(payment.paymentMeansCode.code)) {
      return true;
    }
    return Boolean(payment.cardAccount);
  });
  return schematronResult(rule, passed);
}
