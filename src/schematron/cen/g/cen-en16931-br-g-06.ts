import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyDocumentAllowanceCategoryPercent, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-G-06',
  level: 'fatal',
  message:
    'In a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Export outside the EU" the Document level allowance VAT rate (BT-96) shall be 0 (zero).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrG06(document: PeppolDocument): SchematronRuleResult {
  const passed = everyDocumentAllowanceCategoryPercent(document, 'G', percent => percent === 0);
  return schematronResult(rule, passed);
}
