import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasDocumentChargeVatCategoryCode, hasSellerTaxIdentifier, hasTaxRepresentativeVatCompanyId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-AG-04',
  level: 'fatal',
  message:
    'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "IPSI" shall contain the Seller VAT Identifier (BT-31), the Seller Tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrAg04(document: PeppolDocument): SchematronRuleResult {
  const passed = !hasDocumentChargeVatCategoryCode(document, 'M') || hasSellerTaxIdentifier(document) || hasTaxRepresentativeVatCompanyId(document);
  return schematronResult(rule, passed);
}
