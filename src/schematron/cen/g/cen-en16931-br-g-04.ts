import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasDocumentChargeVatCategoryCode, hasSellerVatCompanyId, hasTaxRepresentativeVatCompanyId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-G-04',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Export outside the EU" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrG04(document: PeppolDocument): SchematronRuleResult {
  const passed = !hasDocumentChargeVatCategoryCode(document, 'G') || hasSellerVatCompanyId(document) || hasTaxRepresentativeVatCompanyId(document);
  return schematronResult(rule, passed);
}
