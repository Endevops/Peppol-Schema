import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-009',
  level: 'fatal',
  message:
    'For Danish Suppliers if the PaymentID is prefixed with 04# or 15# the 16 digits instruction Id must be added to the PaymentID eg. "04#1234567890123456" when Payment means equals 50 (Giro)',
} as const satisfies SchematronRule;

export function validateDkR009(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'DK' || getCustomerCountry(document) !== 'DK') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '50' || !payment.paymentId) {
      return true;
    }
    const paymentId = payment.paymentId;
    if (paymentId.startsWith('04#') || paymentId.startsWith('15#')) {
      return paymentId.length === 19;
    }
    return true;
  });
  return schematronResult(rule, passed);
}
