import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasVatBreakdownCode, countAllVatBreakdowns, countVatBreakdownCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-11',
  level: 'fatal',
  message:
    'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain other VAT breakdown groups (BG-23).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrO11(document: PeppolDocument): SchematronRuleResult {
  const passed = !hasVatBreakdownCode(document, 'O') || countVatBreakdownCode(document, 'O') === countAllVatBreakdowns(document);
  return schematronResult(rule, passed);
}
