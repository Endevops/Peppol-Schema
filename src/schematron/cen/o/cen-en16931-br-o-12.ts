import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, hasVatBreakdownCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-O-12',
  level: 'fatal',
  message:
    'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is not "Not subject to VAT".',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO12(document: PeppolDocument): boolean {
  const passed = !hasVatBreakdownCode(document, 'O') || getLines(document).every(line => line.item.classifiedTaxCategory.id === 'O');
  return passed;
}

export const validateCenEn16931BrO12 = schematronRule(rule, evaluateCenEn16931BrO12);
