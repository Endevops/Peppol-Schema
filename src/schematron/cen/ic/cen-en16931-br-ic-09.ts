import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getTaxSubtotalsWithCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-09',
  level: 'fatal',
  message:
    'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" shall be 0 (zero).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrIc09(document: PeppolDocument): SchematronRuleResult {
  const passed = getTaxSubtotalsWithCode(document, 'K').every(st => st.taxAmount === 0);
  return schematronResult(rule, passed);
}
