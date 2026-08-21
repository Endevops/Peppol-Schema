import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasAnyVatCategoryCode, countVatBreakdownCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-Z-01',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is "Zero rated" shall contain in the VAT breakdown (BG-23) exactly one VAT category code (BT-118) equal with "Zero rated".',
} as const satisfies SchematronRule;

export function validateCenEn16931BrZ01(document: PeppolDocument): SchematronRuleResult {
  const passed = !hasAnyVatCategoryCode(document, 'Z') || countVatBreakdownCode(document, 'Z') === 1;
  return schematronResult(rule, passed);
}
