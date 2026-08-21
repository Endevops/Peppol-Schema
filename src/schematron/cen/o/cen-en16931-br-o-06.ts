import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyDocumentAllowanceCategoryPercent, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-06',
  level: 'fatal',
  message:
    'A Document level allowance (BG-20) where VAT category code (BT-95) is "Not subject to VAT" shall not contain a Document level allowance VAT rate (BT-96).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrO06(document: PeppolDocument): SchematronRuleResult {
  const passed = everyDocumentAllowanceCategoryPercent(document, 'O', percent => percent === undefined);
  return schematronResult(rule, passed);
}
