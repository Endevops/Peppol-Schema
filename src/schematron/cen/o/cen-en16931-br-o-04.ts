import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import {
  hasBuyerVatCompanyId,
  hasDocumentChargeVatCategoryCode,
  hasSellerVatCompanyId,
  hasTaxRepresentativeVatCompanyId,
  schematronRule,
} from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-O-04',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Not subject to VAT" shall not contain the Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) or the Buyer VAT identifier (BT-48).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO04(document: PeppolDocument): boolean {
  const passed =
    !hasDocumentChargeVatCategoryCode(document, 'O') ||
    (!hasSellerVatCompanyId(document) && !hasTaxRepresentativeVatCompanyId(document) && !hasBuyerVatCompanyId(document));
  return passed;
}

export const validateCenEn16931BrO04 = schematronRule(rule, evaluateCenEn16931BrO04);
