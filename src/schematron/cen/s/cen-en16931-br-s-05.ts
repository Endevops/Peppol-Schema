import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { everyLineCategoryPercent, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-S-05',
  level: 'fatal',
  message:
    'In an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Standard rated" the Invoiced item VAT rate (BT-152) shall be greater than zero.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrS05(document: PeppolDocument): boolean {
  const passed = everyLineCategoryPercent(document, 'S', percent => percent !== undefined && percent > 0);
  return passed;
}

export const validateCenEn16931BrS05 = schematronRule(rule, evaluateCenEn16931BrS05);
