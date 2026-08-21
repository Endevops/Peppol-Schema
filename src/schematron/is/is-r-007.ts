import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-007',
  level: 'fatal',
  message: '[IS-R-007]-If seller is icelandic and payment means code is 42 then a 12 digit account id must exist',
} as const satisfies SchematronRule;

export function validateIsR007(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const code42Payments = (document.paymentMeans ?? []).filter(payment => payment.paymentMeansCode.code === '42');
  if (code42Payments.length === 0) {
    return schematronResult(rule, true);
  }
  const passed = code42Payments.every(payment => {
    const accountId = payment.payeeFinancialAccount?.id;
    return typeof accountId === 'string' && accountId.trim().length === 12;
  });
  return schematronResult(rule, passed);
}
