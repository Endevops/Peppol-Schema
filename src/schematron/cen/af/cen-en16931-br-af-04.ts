import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasDocumentChargeVatCategoryCode, hasSellerTaxIdentifier, hasTaxRepresentativeVatCompanyId, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-AF-04',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "IGIC" shall contain the Seller VAT Identifier (BT-31), the Seller Tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAf04(document: PeppolDocument): boolean {
  const passed = !hasDocumentChargeVatCategoryCode(document, 'L') || hasSellerTaxIdentifier(document) || hasTaxRepresentativeVatCompanyId(document);
  return passed;
}

export const validateCenEn16931BrAf04 = schematronRule(rule, evaluateCenEn16931BrAf04);
