import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-005',
  level: 'fatal',
  message: "For Swedish suppliers, when using Seller tax registration identifier, 'Godkänd för F-skatt' must be stated",
} as const satisfies SchematronRule;

export function validateSeR005(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const nonVatScheme = document.accountingSupplierParty.partyTaxSchemes?.find(scheme => scheme.taxSchemeId.id.toUpperCase() !== 'VAT');
  if (!nonVatScheme) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, nonVatScheme.companyId.trim().toUpperCase() === 'GODKÄND FÖR F-SKATT');
}
