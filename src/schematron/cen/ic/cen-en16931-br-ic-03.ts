import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import {
  hasBuyerVatCompanyId,
  hasDocumentAllowanceVatCategoryCode,
  hasSellerVatCompanyId,
  hasTaxRepresentativeVatCompanyId,
  schematronRule,
} from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-03',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Intra-community supply" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrIc03(document: PeppolDocument): boolean {
  const passed =
    !hasDocumentAllowanceVatCategoryCode(document, 'K') ||
    ((hasSellerVatCompanyId(document) || hasTaxRepresentativeVatCompanyId(document)) && hasBuyerVatCompanyId(document));
  return passed;
}

export const validateCenEn16931BrIc03 = schematronRule(rule, evaluateCenEn16931BrIc03);
