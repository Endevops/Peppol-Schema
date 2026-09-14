import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getCustomerCountry, getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-005',
  level: 'fatal',
  message:
    "[NL-R-005] For suppliers in the Netherlands, if the customer is in the Netherlands, the customer's legal entity identifier MUST be either a KVK or OIN number (schemeID 0106 or 0190)",
} as const satisfies SchematronRule;

const ALLOWED_SCHEMES = new Set(['0106', '0190']);

function evaluateNlR005(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NL' || getCustomerCountry(document) !== 'NL') {
    return true;
  }
  const companyId = document.accountingCustomerParty.partyLegalEntity.companyId;
  if (!companyId?.id) {
    return true;
  }
  return Boolean(companyId.schemeId && ALLOWED_SCHEMES.has(companyId.schemeId));
}

export const validateNlR005 = schematronRule(rule, evaluateNlR005);
