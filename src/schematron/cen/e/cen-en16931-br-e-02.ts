import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasLineVatCategoryCode, hasSellerTaxIdentifier, hasTaxRepresentativeVatCompanyId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-E-02',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Exempt from VAT" shall contain the Seller VAT Identifier (BT-31), the Seller tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrE02(document: PeppolDocument): SchematronRuleResult {
  const passed = !hasLineVatCategoryCode(document, 'E') || hasSellerTaxIdentifier(document) || hasTaxRepresentativeVatCompanyId(document);
  return schematronResult(rule, passed);
}
