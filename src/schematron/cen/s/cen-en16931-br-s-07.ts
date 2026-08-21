import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyDocumentChargeCategoryPercent, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-S-07',
  level: 'fatal',
  message:
    'In a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Standard rated" the Document level charge VAT rate (BT-103) shall be greater than zero.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrS07(document: PeppolDocument): SchematronRuleResult {
  const passed = everyDocumentChargeCategoryPercent(document, 'S', percent => percent !== undefined && percent > 0);
  return schematronResult(rule, passed);
}
