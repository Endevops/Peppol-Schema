import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasVatCategoryCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-B-02',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is “Split payment" shall not contain an invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is “Standard rated”.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrB02(document: PeppolDocument): SchematronRuleResult {
  const passed = !hasVatCategoryCode(document, 'B') || !hasVatCategoryCode(document, 'S');
  return schematronResult(rule, passed);
}
