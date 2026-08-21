import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-008',
  level: 'fatal',
  message:
    'For Danish Suppliers PaymentID is mandatory and MUST start with 01#, 04# or 15# (kortartkode), and PayeeFinancialAccount/ID (Giro kontonummer) is mandatory and must be 7 or 8 numerical characters long, when payment means equals 50 (Giro)',
} as const satisfies SchematronRule;

export function validateDkR008(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'DK' || getCustomerCountry(document) !== 'DK') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '50') {
      return true;
    }
    const paymentId = payment.paymentId;
    const giroAccountId = payment.payeeFinancialAccount?.id;
    const startsWithValidPrefix = paymentId ? ['01#', '04#', '15#'].some(prefix => paymentId.startsWith(prefix)) : false;
    return startsWithValidPrefix && typeof giroAccountId === 'string' && /^[0-9]{7,8}$/.test(giroAccountId);
  });
  return schematronResult(rule, passed);
}
