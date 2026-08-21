import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-002',
  level: 'fatal',
  message: 'For Swedish suppliers, the Swedish VAT-numbers must have the trailing 12 characters in numeric form',
} as const satisfies SchematronRule;

export function validateSeR002(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const vatCompanyId = document.accountingSupplierParty.partyTaxSchemes?.find(scheme => scheme.taxSchemeId.id === 'VAT')?.companyId;
  return schematronResult(rule, vatCompanyId !== undefined && /^\d{12}$/.test(vatCompanyId.slice(2)));
}
