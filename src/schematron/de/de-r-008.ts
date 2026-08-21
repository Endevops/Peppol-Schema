import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = { id: 'DE-R-008', level: 'fatal', message: 'The element "Buyer city" (BT-52) shall be provided.' } as const satisfies SchematronRule;

export function validateDeR008(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const cityName = document.accountingCustomerParty.postalAddress.cityName;
  return schematronResult(rule, typeof cityName === 'string' && cityName.trim() !== '');
}
