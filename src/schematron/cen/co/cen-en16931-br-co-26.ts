import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasSellerLegalCompanyId, hasSellerTaxIdentifier, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-26',
  level: 'fatal',
  message:
    'In order for the buyer to automatically identify a supplier, the Seller identifier (BT-29), the Seller legal registration identifier (BT-30) and/or the Seller VAT identifier (BT-31) shall be present.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo26(document: PeppolDocument): boolean {
  const passed =
    hasSellerTaxIdentifier(document) ||
    typeof document.accountingSupplierParty.partyIdentification?.id.id === 'string' ||
    hasSellerLegalCompanyId(document);
  return passed;
}

export const validateCenEn16931BrCo26 = schematronRule(rule, evaluateCenEn16931BrCo26);
