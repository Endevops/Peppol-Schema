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
  id: 'CEN-EN16931-BR-O-04',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Not subject to VAT" shall not contain the Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) or the Buyer VAT identifier (BT-48).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrO04(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !hasDocumentChargeVatCategoryCode(document, 'O') ||
    (!hasSellerVatCompanyId(document) && !hasTaxRepresentativeVatCompanyId(document) && !hasBuyerVatCompanyId(document));
  return schematronResult(rule, passed);
}
