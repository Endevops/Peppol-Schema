import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { countVatBreakdownCode, hasAnyVatCategoryCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-AE-01',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is "Reverse charge" shall contain in the VAT Breakdown (BG-23) exactly one VAT category code (BT-118) equal with "VAT reverse charge".',
} as const satisfies SchematronRule;

export function validateCenEn16931BrAe01(document: PeppolDocument): SchematronRuleResult {
  const passed = !hasAnyVatCategoryCode(document, 'AE') || countVatBreakdownCode(document, 'AE') === 1;
  return schematronResult(rule, passed);
}
