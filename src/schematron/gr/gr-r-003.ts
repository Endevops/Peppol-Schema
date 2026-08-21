import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification';
import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-003',
  level: 'fatal',
  message: "For the Greek Suppliers, the VAT must start with 'EL' and must be a valid TIN number",
} as const satisfies SchematronRule;

export function validateGrR003(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const vatCompanyId = document.accountingSupplierParty.partyTaxSchemes?.find(
    scheme => scheme.taxSchemeId.id.trim().toUpperCase() === 'VAT'
  )?.companyId;
  if (!vatCompanyId) {
    return schematronResult(rule, false);
  }
  return schematronResult(rule, vatCompanyId.startsWith('EL') && greekTinVerification(vatCompanyId.slice(2)));
}
