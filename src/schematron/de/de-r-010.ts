import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-010',
  level: 'fatal',
  message: 'The element "Deliver to city" (BT-77) shall be provided if the group "DELIVER TO ADDRESS" (BG-15) is delivered.',
} as const satisfies SchematronRule;

export function validateDeR010(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const address = document.delivery?.deliveryLocation?.address;
  if (!address) {
    return schematronResult(rule, true);
  }
  const cityName = address.cityName;
  return schematronResult(rule, typeof cityName === 'string' && cityName.trim() !== '');
}
