import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasDocumentAllowanceVatCategoryCode, hasSellerVatCompanyId, hasTaxRepresentativeVatCompanyId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-G-03',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Export outside the EU" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrG03(document: PeppolDocument): SchematronRuleResult {
  const passed = !hasDocumentAllowanceVatCategoryCode(document, 'G') || hasSellerVatCompanyId(document) || hasTaxRepresentativeVatCompanyId(document);
  return schematronResult(rule, passed);
}
