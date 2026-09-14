import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasDocumentChargeVatCategoryCode, hasSellerVatCompanyId, hasTaxRepresentativeVatCompanyId, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-G-04',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Export outside the EU" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrG04(document: PeppolDocument): boolean {
  const passed = !hasDocumentChargeVatCategoryCode(document, 'G') || hasSellerVatCompanyId(document) || hasTaxRepresentativeVatCompanyId(document);
  return passed;
}

export const validateCenEn16931BrG04 = schematronRule(rule, evaluateCenEn16931BrG04);
