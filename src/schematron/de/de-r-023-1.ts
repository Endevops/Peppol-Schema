import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-023-1',
  level: 'fatal',
  message: 'If "Payment means type code" (BT-81) contains a code for credit transfer (30, 58), "CREDIT TRANSFER" (BG-17) shall be provided.',
} as const satisfies SchematronRule;

const CREDIT_TRANSFER_CODES = new Set(['30', '58']);

export function validateDeR023_1(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!CREDIT_TRANSFER_CODES.has(payment.paymentMeansCode.code)) {
      return true;
    }
    return Boolean(payment.payeeFinancialAccount);
  });
  return schematronResult(rule, passed);
}
