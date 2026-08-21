import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyLineCategoryPercent, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-05',
  level: 'fatal',
  message:
    'An Invoice line (BG-25) where the VAT category code (BT-151) is "Not subject to VAT" shall not contain an Invoiced item VAT rate (BT-152).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrO05(document: PeppolDocument): SchematronRuleResult {
  const passed = everyLineCategoryPercent(document, 'O', percent => percent === undefined);
  return schematronResult(rule, passed);
}
