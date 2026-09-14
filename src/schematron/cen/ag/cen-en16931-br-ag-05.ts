import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { everyLineCategoryPercent, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-AG-05',
  level: 'fatal',
  message:
    'In an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "IPSI" the Invoiced item VAT rate (BT-152) shall be 0 (zero) or greater than zero.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAg05(document: PeppolDocument): boolean {
  const passed = everyLineCategoryPercent(document, 'M', percent => percent !== undefined && percent >= 0);
  return passed;
}

export const validateCenEn16931BrAg05 = schematronRule(rule, evaluateCenEn16931BrAg05);
