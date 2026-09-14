import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-002',
  level: 'fatal',
  message: 'For Swedish suppliers, the Swedish VAT-numbers must have the trailing 12 characters in numeric form',
} as const satisfies SchematronRule;

function evaluateSeR002(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const vatCompanyId = document.accountingSupplierParty.partyTaxSchemes?.find(scheme => scheme.taxSchemeId.id === 'VAT')?.companyId;
  return vatCompanyId !== undefined && /^\d{12}$/.test(vatCompanyId.slice(2));
}

export const validateSeR002 = schematronRule(rule, evaluateSeR002);
