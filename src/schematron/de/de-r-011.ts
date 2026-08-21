import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-011',
  level: 'fatal',
  message: 'The element "Deliver to post code" (BT-78) shall be provided if the group "DELIVER TO ADDRESS" (BG-15) is delivered.',
} as const satisfies SchematronRule;

export function validateDeR011(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const address = document.delivery?.deliveryLocation?.address;
  if (!address) {
    return schematronResult(rule, true);
  }
  const postalZone = address.postalZone;
  return schematronResult(rule, typeof postalZone === 'string' && postalZone.trim() !== '');
}
