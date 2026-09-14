import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'SE-R-001',
  level: 'fatal',
  message: 'For Swedish suppliers, Swedish VAT-numbers must consist of 14 characters.',
} as const satisfies SchematronRule;

function evaluateSeR001(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const vatCompanyId = document.accountingSupplierParty.partyTaxSchemes?.find(scheme => scheme.taxSchemeId.id === 'VAT')?.companyId;
  return vatCompanyId?.trim().length === 14;
}

export const validateSeR001 = schematronRule(rule, evaluateSeR001);
