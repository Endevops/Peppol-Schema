import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-007',
  level: 'fatal',
  message: '[IS-R-007]-If seller is icelandic and payment means code is 42 then a 12 digit account id must exist',
} as const satisfies SchematronRule;

function evaluateIsR007(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS') {
    return true;
  }
  const code42Payments = (document.paymentMeans ?? []).filter(payment => payment.paymentMeansCode.code === '42');
  if (code42Payments.length === 0) {
    return true;
  }
  const passed = code42Payments.every(payment => {
    const accountId = payment.payeeFinancialAccount?.id;
    return typeof accountId === 'string' && accountId.trim().length === 12;
  });
  return passed;
}

export const validateIsR007 = schematronRule(rule, evaluateIsR007);
