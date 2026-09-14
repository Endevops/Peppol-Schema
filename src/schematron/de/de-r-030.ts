import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-030',
  level: 'fatal',
  message: 'If the group "DIRECT DEBIT" (BG-19) is delivered, the element "Bank assigned creditor identifier" (BT-90) shall be provided.',
} as const satisfies SchematronRule;

function evaluateDeR030(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const hasPaymentMandate = (document.paymentMeans ?? []).some(payment => Boolean(payment.paymentMandate));
  if (!hasPaymentMandate) {
    return true;
  }
  const hasSepaCreditorId =
    document.accountingSupplierParty.partyIdentification?.id?.schemeId === 'SEPA' ||
    document.payeeParty?.partyIdentification?.id?.schemeId === 'SEPA';
  return hasSepaCreditorId;
}

export const validateDeR030 = schematronRule(rule, evaluateDeR030);
