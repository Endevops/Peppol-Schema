import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { countAllVatBreakdowns, countVatBreakdownCode, hasVatBreakdownCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-O-11',
  level: 'fatal',
  message:
    'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain other VAT breakdown groups (BG-23).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO11(document: PeppolDocument): boolean {
  const passed = !hasVatBreakdownCode(document, 'O') || countVatBreakdownCode(document, 'O') === countAllVatBreakdowns(document);
  return passed;
}

export const validateCenEn16931BrO11 = schematronRule(rule, evaluateCenEn16931BrO11);
