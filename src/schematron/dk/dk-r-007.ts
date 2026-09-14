import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-007',
  level: 'fatal',
  message: 'For Danish suppliers PaymentMandate/ID and PayerFinancialAccount/ID are mandatory when payment means is 49',
} as const satisfies SchematronRule;

function evaluateDkR007(document: PeppolDocument): boolean {
  if (!isDanishSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '49') {
      return true;
    }
    const mandateId = payment.paymentMandate?.id;
    const payerAccountId = payment.paymentMandate?.payerFinancialAccountId?.id;
    return typeof mandateId === 'string' && mandateId.trim() !== '' && typeof payerAccountId === 'string' && payerAccountId.trim() !== '';
  });
  return passed;
}

export const validateDkR007 = schematronRule(rule, evaluateDkR007);
