import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DK-R-010',
  level: 'fatal',
  message:
    'For Danish Suppliers using PaymentMeansCode 93, PaymentID is mandatory. The first three characters of the PaymentID MUST be 71#, 73# or 75# (kortartskode), and PayeeFinancialAccount/ID MUST be exactly 8 characters long.',
} as const satisfies SchematronRule;

function evaluateDkR010(document: PeppolDocument): boolean {
  if (!isDanishSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '93') {
      return true;
    }
    const paymentId = payment.paymentId;
    const startsWithValidPrefix = paymentId ? ['71#', '73#', '75#'].some(prefix => paymentId.startsWith(prefix)) : false;
    const accountId = payment.payeeFinancialAccount?.id;
    return startsWithValidPrefix && typeof accountId === 'string' && accountId.length === 8;
  });
  return passed;
}

export const validateDkR010 = schematronRule(rule, evaluateDkR010);
