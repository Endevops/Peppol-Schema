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
  id: 'CEN-EN16931-BR-IC-02',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Intra-community supply" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrIc02(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !hasLineVatCategoryCode(document, 'K') ||
    ((hasSellerVatCompanyId(document) || hasTaxRepresentativeVatCompanyId(document)) && hasBuyerVatCompanyId(document));
  return schematronResult(rule, passed);
}
