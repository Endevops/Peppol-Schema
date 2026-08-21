import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyLineCategoryPercent, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-E-05',
  level: 'fatal',
  message:
    'In an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "Exempt from VAT", the Invoiced item VAT rate (BT-152) shall be 0 (zero).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrE05(document: PeppolDocument): SchematronRuleResult {
  const passed = everyLineCategoryPercent(document, 'E', percent => percent === 0);
  return schematronResult(rule, passed);
}
