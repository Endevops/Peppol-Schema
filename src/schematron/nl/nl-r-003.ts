import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-003',
  level: 'fatal',
  message: '[NL-R-003] For suppliers in the Netherlands, the legal entity identifier MUST be either a KVK or OIN number (schemeID 0106 or 0190)',
} as const satisfies SchematronRule;

const ALLOWED_SCHEMES = new Set(['0106', '0190']);

export function validateNlR003(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NL') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  if (!companyId?.id) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, Boolean(companyId.schemeId && ALLOWED_SCHEMES.has(companyId.schemeId)));
}
