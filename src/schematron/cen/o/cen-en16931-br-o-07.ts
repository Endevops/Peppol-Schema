import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyDocumentChargeCategoryPercent, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-07',
  level: 'fatal',
  message:
    'A Document level charge (BG-21) where the VAT category code (BT-102) is "Not subject to VAT" shall not contain a Document level charge VAT rate (BT-103).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrO07(document: PeppolDocument): SchematronRuleResult {
  const passed = everyDocumentChargeCategoryPercent(document, 'O', percent => percent === undefined);
  return schematronResult(rule, passed);
}
