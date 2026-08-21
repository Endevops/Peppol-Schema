import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import {
  hasBuyerVatCompanyId,
  hasLineVatCategoryCode,
  hasSellerVatCompanyId,
  hasTaxRepresentativeVatCompanyId,
  schematronResult,
} from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-02',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Not subject to VAT" shall not contain the Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) or the Buyer VAT identifier (BT-48).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrO02(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !hasLineVatCategoryCode(document, 'O') ||
    (!hasSellerVatCompanyId(document) && !hasTaxRepresentativeVatCompanyId(document) && !hasBuyerVatCompanyId(document));
  return schematronResult(rule, passed);
}
