import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-S-011',
  level: 'warning',
  message: 'Greek suppliers must provide their Seller Tax Registration Number, prefixed by the country code',
} as const satisfies SchematronRule;

export function validateGrS011(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const vatSchemes = document.accountingSupplierParty.partyTaxSchemes?.filter(scheme => scheme.taxSchemeId.id.trim().toUpperCase() === 'VAT') ?? [];
  if (vatSchemes.length !== 1) {
    return schematronResult(rule, false);
  }
  const companyId = vatSchemes[0]?.companyId ?? '';
  return schematronResult(rule, companyId.startsWith('EL'));
}
