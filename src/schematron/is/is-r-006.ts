import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-006',
  level: 'fatal',
  message: '[IS-R-006]-If seller is icelandic and payment means code is 9 then a 12 digit account id must exist',
} as const satisfies SchematronRule;

export function validateIsR006(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const code9Payments = (document.paymentMeans ?? []).filter(payment => payment.paymentMeansCode.code === '9');
  if (code9Payments.length === 0) {
    return schematronResult(rule, true);
  }
  const passed = code9Payments.every(payment => {
    const accountId = payment.payeeFinancialAccount?.id;
    return typeof accountId === 'string' && accountId.trim().length === 12;
  });
  return schematronResult(rule, passed);
}
