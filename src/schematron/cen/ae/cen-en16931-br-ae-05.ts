import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyLineCategoryPercent, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-AE-05',
  level: 'fatal',
  message:
    'In an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Reverse charge" the Invoiced item VAT rate (BT-152) shall be 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAe05(document: PeppolDocument): boolean {
  const passed = everyLineCategoryPercent(document, 'AE', percent => percent === 0);
  return passed;
}

export const validateCenEn16931BrAe05 = schematronRule(rule, evaluateCenEn16931BrAe05);
