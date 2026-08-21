import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-001',
  level: 'fatal',
  message: 'For Swedish suppliers, Swedish VAT-numbers must consist of 14 characters.',
} as const satisfies SchematronRule;

export function validateSeR001(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const vatCompanyId = document.accountingSupplierParty.partyTaxSchemes?.find(scheme => scheme.taxSchemeId.id === 'VAT')?.companyId;
  return schematronResult(rule, vatCompanyId?.trim().length === 14);
}
