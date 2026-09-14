import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DK-R-009',
  level: 'fatal',
  message:
    'For Danish Suppliers if the PaymentID is prefixed with 04# or 15# the 16 digits instruction Id must be added to the PaymentID eg. "04#1234567890123456" when Payment means equals 50 (Giro)',
} as const satisfies SchematronRule;

function evaluateDkR009(document: PeppolDocument): boolean {
  if (!isDanishSupplierAndCustomer(document)) {
    return true;
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
  return passed;
}

export const validateDkR009 = schematronRule(rule, evaluateDkR009);
