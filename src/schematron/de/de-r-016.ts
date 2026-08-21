import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getAllAllowanceCharges, getLines, isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-016',
  level: 'fatal',
  message:
    'If one of the VAT codes S, Z, E, AE, K, G, L, or M is used, an invoice shall contain at least one of the following elements: "Seller VAT identifier" (BT-31) or "Seller tax registration identifier" (BT-32) or "SELLER TAX REPRESENTATIVE PARTY" (BG-11).',
} as const satisfies SchematronRule;

const SUPPORTED_VAT_CODES = new Set(['S', 'Z', 'E', 'AE', 'K', 'G', 'L', 'M']);

export function validateDeR016(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const lineCodes = getLines(document).map(line => line.item.classifiedTaxCategory.id);
  const allowanceCodes = getAllAllowanceCharges(document)
    .map(ac => ac.taxCategoryId)
    .filter((code): code is string => code !== undefined);
  const usesSupportedCode = [...lineCodes, ...allowanceCodes].some(code => SUPPORTED_VAT_CODES.has(code));
  if (!usesSupportedCode) {
    return schematronResult(rule, true);
  }
  const hasTaxRepresentative = Boolean(document.taxRepresentativeParty);
  const hasSellerTaxId = document.accountingSupplierParty.partyTaxSchemes?.some(scheme => scheme.companyId.trim() !== '') ?? false;
  return schematronResult(rule, hasTaxRepresentative || hasSellerTaxId);
}
