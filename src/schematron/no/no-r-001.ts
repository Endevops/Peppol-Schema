import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isValidMod11 } from '#/peppol-validations/is-valid-mod11';
import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'NO-R-001',
  level: 'fatal',
  message:
    'For Norwegian suppliers, a VAT number MUST be the country code prefix NO followed by a valid Norwegian organization number (nine numbers) followed by the letters MVA.',
} as const satisfies SchematronRule;

function evaluateNoR001(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NO') {
    return true;
  }
  const vatCompanyId = document.accountingSupplierParty.partyTaxSchemes?.find(scheme => scheme.taxSchemeId.id === 'VAT')?.companyId;
  if (!vatCompanyId || vatCompanyId.slice(0, 2) !== 'NO') {
    return true;
  }
  const orgNumber = vatCompanyId.slice(2);
  const passed = /^[0-9]{9}MVA$/.test(orgNumber) && isValidMod11(orgNumber.slice(0, 9));
  return passed;
}

export const validateNoR001 = schematronRule(rule, evaluateNoR001);
