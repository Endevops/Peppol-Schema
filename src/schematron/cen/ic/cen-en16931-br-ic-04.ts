import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import {
  hasBuyerVatCompanyId,
  hasDocumentChargeVatCategoryCode,
  hasSellerVatCompanyId,
  hasTaxRepresentativeVatCompanyId,
  schematronResult,
} from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-04',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Intra-community supply" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrIc04(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !hasDocumentChargeVatCategoryCode(document, 'K') ||
    ((hasSellerVatCompanyId(document) || hasTaxRepresentativeVatCompanyId(document)) && hasBuyerVatCompanyId(document));
  return schematronResult(rule, passed);
}
