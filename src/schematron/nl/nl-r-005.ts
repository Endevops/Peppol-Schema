import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-005',
  level: 'fatal',
  message:
    "[NL-R-005] For suppliers in the Netherlands, if the customer is in the Netherlands, the customer's legal entity identifier MUST be either a KVK or OIN number (schemeID 0106 or 0190)",
} as const satisfies SchematronRule;

const ALLOWED_SCHEMES = new Set(['0106', '0190']);

export function validateNlR005(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NL' || getCustomerCountry(document) !== 'NL') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingCustomerParty.partyLegalEntity.companyId;
  if (!companyId?.id) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, Boolean(companyId.schemeId && ALLOWED_SCHEMES.has(companyId.schemeId)));
}
