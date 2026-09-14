import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyLineCategoryPercent, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-O-05',
  level: 'fatal',
  message:
    'An Invoice line (BG-25) where the VAT category code (BT-151) is "Not subject to VAT" shall not contain an Invoiced item VAT rate (BT-152).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO05(document: PeppolDocument): boolean {
  const passed = everyLineCategoryPercent(document, 'O', percent => percent === undefined);
  return passed;
}

export const validateCenEn16931BrO05 = schematronRule(rule, evaluateCenEn16931BrO05);
