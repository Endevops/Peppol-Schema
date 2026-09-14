import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyLineCategoryPercent, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-IC-05',
  level: 'fatal',
  message:
    'In an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Intracommunity supply" the Invoiced item VAT rate (BT-152) shall be 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrIc05(document: PeppolDocument): boolean {
  const passed = everyLineCategoryPercent(document, 'K', percent => percent === 0);
  return passed;
}

export const validateCenEn16931BrIc05 = schematronRule(rule, evaluateCenEn16931BrIc05);
