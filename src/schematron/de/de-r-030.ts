import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-030',
  level: 'fatal',
  message: 'If the group "DIRECT DEBIT" (BG-19) is delivered, the element "Bank assigned creditor identifier" (BT-90) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR030(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const hasPaymentMandate = (document.paymentMeans ?? []).some(payment => Boolean(payment.paymentMandate));
  if (!hasPaymentMandate) {
    return schematronResult(rule, true);
  }
  const hasSepaCreditorId =
    document.accountingSupplierParty.partyIdentification?.id?.schemeId === 'SEPA' ||
    document.payeeParty?.partyIdentification?.id?.schemeId === 'SEPA';
  return schematronResult(rule, hasSepaCreditorId);
}
