import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasSellerLegalCompanyId, hasSellerTaxIdentifier, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-26',
  level: 'fatal',
  message:
    'In order for the buyer to automatically identify a supplier, the Seller identifier (BT-29), the Seller legal registration identifier (BT-30) and/or the Seller VAT identifier (BT-31) shall be present.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo26(document: PeppolDocument): SchematronRuleResult {
  const passed =
    hasSellerTaxIdentifier(document) ||
    typeof document.accountingSupplierParty.partyIdentification?.id.id === 'string' ||
    hasSellerLegalCompanyId(document);
  return schematronResult(rule, passed);
}
