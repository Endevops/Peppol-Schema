import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-011',
  level: 'fatal',
  message:
    'For Danish Suppliers if the PaymentID is prefixed with 71# or 75# the 15-16 digits instruction Id must be added to the PaymentID eg. "71#1234567890123456" when payment Method equals 93 (FIK)',
} as const satisfies SchematronRule;

export function validateDkR011(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'DK' || getCustomerCountry(document) !== 'DK') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '93' || !payment.paymentId) {
      return true;
    }
    const paymentId = payment.paymentId;
    if (paymentId.startsWith('71#') || paymentId.startsWith('75#')) {
      return paymentId.length === 18 || paymentId.length === 19;
    }
    return true;
  });
  return schematronResult(rule, passed);
}
