import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification.ts';
import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-003',
  level: 'fatal',
  message: "For the Greek Suppliers, the VAT must start with 'EL' and must be a valid TIN number",
} as const satisfies SchematronRule;

function evaluateGrR003(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const vatCompanyId = document.accountingSupplierParty.partyTaxSchemes?.find(
    scheme => scheme.taxSchemeId.id.trim().toUpperCase() === 'VAT'
  )?.companyId;
  if (!vatCompanyId) {
    return false;
  }
  return vatCompanyId.startsWith('EL') && greekTinVerification(vatCompanyId.slice(2));
}

export const validateGrR003 = schematronRule(rule, evaluateGrR003);
