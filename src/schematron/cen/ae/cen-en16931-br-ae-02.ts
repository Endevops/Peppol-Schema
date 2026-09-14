import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import {
  hasBuyerLegalCompanyId,
  hasBuyerVatCompanyId,
  hasLineVatCategoryCode,
  hasSellerTaxIdentifier,
  hasTaxRepresentativeVatCompanyId,
  schematronRule,
} from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-AE-02',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Reverse charge" shall contain the Seller VAT Identifier (BT-31), the Seller Tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) and/or the Buyer legal registration identifier (BT-47).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAe02(document: PeppolDocument): boolean {
  const passed =
    !hasLineVatCategoryCode(document, 'AE') ||
    ((hasSellerTaxIdentifier(document) || hasTaxRepresentativeVatCompanyId(document)) &&
      (hasBuyerVatCompanyId(document) || hasBuyerLegalCompanyId(document)));
  return passed;
}

export const validateCenEn16931BrAe02 = schematronRule(rule, evaluateCenEn16931BrAe02);
