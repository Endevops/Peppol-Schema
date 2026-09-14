import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-008',
  level: 'fatal',
  message:
    'For Danish Suppliers PaymentID is mandatory and MUST start with 01#, 04# or 15# (kortartkode), and PayeeFinancialAccount/ID (Giro kontonummer) is mandatory and must be 7 or 8 numerical characters long, when payment means equals 50 (Giro)',
} as const satisfies SchematronRule;

function evaluateDkR008(document: PeppolDocument): boolean {
  if (!isDanishSupplierAndCustomer(document)) {
    return true;
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
  return passed;
}

export const validateDkR008 = schematronRule(rule, evaluateDkR008);
