import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import {
  hasBuyerLegalCompanyId,
  hasBuyerVatCompanyId,
  hasDocumentAllowanceVatCategoryCode,
  hasSellerTaxIdentifier,
  hasTaxRepresentativeVatCompanyId,
  schematronResult,
} from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-AE-03',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Reverse charge" shall contain the Seller VAT Identifier (BT-31), the Seller tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) and/or the Buyer legal registration identifier (BT-47).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrAe03(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !hasDocumentAllowanceVatCategoryCode(document, 'AE') ||
    ((hasSellerTaxIdentifier(document) || hasTaxRepresentativeVatCompanyId(document)) &&
      (hasBuyerVatCompanyId(document) || hasBuyerLegalCompanyId(document)));
  return schematronResult(rule, passed);
}
