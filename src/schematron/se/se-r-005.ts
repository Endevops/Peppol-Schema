import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-005',
  level: 'fatal',
  message: "For Swedish suppliers, when using Seller tax registration identifier, 'Godkänd för F-skatt' must be stated",
} as const satisfies SchematronRule;

function evaluateSeR005(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const nonVatScheme = document.accountingSupplierParty.partyTaxSchemes?.find(scheme => scheme.taxSchemeId.id.toUpperCase() !== 'VAT');
  if (!nonVatScheme) {
    return true;
  }
  return nonVatScheme.companyId.trim().toUpperCase() === 'GODKÄND FÖR F-SKATT';
}

export const validateSeR005 = schematronRule(rule, evaluateSeR005);
