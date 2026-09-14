import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import {
  hasBuyerVatCompanyId,
  hasLineVatCategoryCode,
  hasSellerVatCompanyId,
  hasTaxRepresentativeVatCompanyId,
  schematronRule,
} from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-O-02',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Not subject to VAT" shall not contain the Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) or the Buyer VAT identifier (BT-48).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO02(document: PeppolDocument): boolean {
  const passed =
    !hasLineVatCategoryCode(document, 'O') ||
    (!hasSellerVatCompanyId(document) && !hasTaxRepresentativeVatCompanyId(document) && !hasBuyerVatCompanyId(document));
  return passed;
}

export const validateCenEn16931BrO02 = schematronRule(rule, evaluateCenEn16931BrO02);
