import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import {
  hasBuyerLegalCompanyId,
  hasBuyerVatCompanyId,
  hasDocumentChargeVatCategoryCode,
  hasSellerTaxIdentifier,
  hasTaxRepresentativeVatCompanyId,
  schematronRule,
} from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-AE-04',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Reverse charge" shall contain the Seller VAT Identifier (BT-31), the Seller tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) and/or the Buyer legal registration identifier (BT-47).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAe04(document: PeppolDocument): boolean {
  const passed =
    !hasDocumentChargeVatCategoryCode(document, 'AE') ||
    ((hasSellerTaxIdentifier(document) || hasTaxRepresentativeVatCompanyId(document)) &&
      (hasBuyerVatCompanyId(document) || hasBuyerLegalCompanyId(document)));
  return passed;
}

export const validateCenEn16931BrAe04 = schematronRule(rule, evaluateCenEn16931BrAe04);
