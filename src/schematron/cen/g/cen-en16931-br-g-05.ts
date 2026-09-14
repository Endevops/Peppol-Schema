import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyLineCategoryPercent, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-G-05',
  level: 'fatal',
  message:
    'In an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Export outside the EU" the Invoiced item VAT rate (BT-152) shall be 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrG05(document: PeppolDocument): boolean {
  const passed = everyLineCategoryPercent(document, 'G', percent => percent === 0);
  return passed;
}

export const validateCenEn16931BrG05 = schematronRule(rule, evaluateCenEn16931BrG05);
