import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import {
  hasBuyerVatCompanyId,
  hasDocumentAllowanceVatCategoryCode,
  hasSellerVatCompanyId,
  hasTaxRepresentativeVatCompanyId,
  schematronResult,
} from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-03',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Not subject to VAT" shall not contain the Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) or the Buyer VAT identifier (BT-48).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrO03(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !hasDocumentAllowanceVatCategoryCode(document, 'O') ||
    (!hasSellerVatCompanyId(document) && !hasTaxRepresentativeVatCompanyId(document) && !hasBuyerVatCompanyId(document));
  return schematronResult(rule, passed);
}
