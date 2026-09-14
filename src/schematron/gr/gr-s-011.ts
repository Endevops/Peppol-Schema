import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-S-011',
  level: 'warning',
  message: 'Greek suppliers must provide their Seller Tax Registration Number, prefixed by the country code',
} as const satisfies SchematronRule;

function evaluateGrS011(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const vatSchemes = document.accountingSupplierParty.partyTaxSchemes?.filter(scheme => scheme.taxSchemeId.id.trim().toUpperCase() === 'VAT') ?? [];
  if (vatSchemes.length !== 1) {
    return false;
  }
  const companyId = vatSchemes[0]?.companyId ?? '';
  return companyId.startsWith('EL');
}

export const validateGrS011 = schematronRule(rule, evaluateGrS011);
