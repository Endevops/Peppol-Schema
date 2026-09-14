import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'IS-R-006',
  level: 'fatal',
  message: '[IS-R-006]-If seller is icelandic and payment means code is 9 then a 12 digit account id must exist',
} as const satisfies SchematronRule;

function evaluateIsR006(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS') {
    return true;
  }
  const code9Payments = (document.paymentMeans ?? []).filter(payment => payment.paymentMeansCode.code === '9');
  if (code9Payments.length === 0) {
    return true;
  }
  const passed = code9Payments.every(payment => {
    const accountId = payment.payeeFinancialAccount?.id;
    return typeof accountId === 'string' && accountId.trim().length === 12;
  });
  return passed;
}

export const validateIsR006 = schematronRule(rule, evaluateIsR006);
