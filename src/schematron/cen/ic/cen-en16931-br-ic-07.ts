import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyDocumentChargeCategoryPercent, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-07',
  level: 'fatal',
  message:
    'In a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Intra-community supply" the Document level charge VAT rate (BT-103) shall be 0 (zero).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrIc07(document: PeppolDocument): SchematronRuleResult {
  const passed = everyDocumentChargeCategoryPercent(document, 'K', percent => percent === 0);
  return schematronResult(rule, passed);
}
