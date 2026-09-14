import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyLineCategoryPercent, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-AF-05',
  level: 'fatal',
  message:
    'In an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "IGIC" the invoiced item VAT rate (BT-152) shall be 0 (zero) or greater than zero.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAf05(document: PeppolDocument): boolean {
  const passed = everyLineCategoryPercent(document, 'L', percent => percent !== undefined && percent >= 0);
  return passed;
}

export const validateCenEn16931BrAf05 = schematronRule(rule, evaluateCenEn16931BrAf05);
