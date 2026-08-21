import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NO-R-002',
  level: 'warning',
  message: 'For Norwegian suppliers, most invoice issuers are required to append "Foretaksregisteret" to their invoice.',
} as const satisfies SchematronRule;

export function validateNoR002(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NO') {
    return schematronResult(rule, true);
  }
  const taxCompanyId = document.accountingSupplierParty.partyTaxSchemes?.find(scheme => scheme.taxSchemeId.id === 'TAX')?.companyId;
  return schematronResult(rule, taxCompanyId === 'Foretaksregisteret');
}
