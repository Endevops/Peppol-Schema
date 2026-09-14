import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getAllAllowanceCharges, getLines, isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-016',
  level: 'fatal',
  message:
    'If one of the VAT codes S, Z, E, AE, K, G, L, or M is used, an invoice shall contain at least one of the following elements: "Seller VAT identifier" (BT-31) or "Seller tax registration identifier" (BT-32) or "SELLER TAX REPRESENTATIVE PARTY" (BG-11).',
} as const satisfies SchematronRule;

const SUPPORTED_VAT_CODES = new Set(['S', 'Z', 'E', 'AE', 'K', 'G', 'L', 'M']);

function evaluateDeR016(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const lineCodes = getLines(document).map(line => line.item.classifiedTaxCategory.id);
  const allowanceCodes = getAllAllowanceCharges(document)
    .map(ac => ac.taxCategoryId)
    .filter((code): code is string => code !== undefined);
  const usesSupportedCode = [...lineCodes, ...allowanceCodes].some(code => SUPPORTED_VAT_CODES.has(code));
  if (!usesSupportedCode) {
    return true;
  }
  const hasTaxRepresentative = Boolean(document.taxRepresentativeParty);
  const hasSellerTaxId = document.accountingSupplierParty.partyTaxSchemes?.some(scheme => scheme.companyId.trim() !== '') ?? false;
  return hasTaxRepresentative || hasSellerTaxId;
}

export const validateDeR016 = schematronRule(rule, evaluateDeR016);
