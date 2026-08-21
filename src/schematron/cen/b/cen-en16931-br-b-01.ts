import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyCountryCodeIs, hasVatCategoryCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-B-01',
  level: 'fatal',
  message: 'An Invoice where the VAT category code (BT-151, BT-95 or BT-102) is “Split payment” shall be a domestic Italian invoice.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrB01(document: PeppolDocument): SchematronRuleResult {
  const passed = !hasVatCategoryCode(document, 'B') || everyCountryCodeIs(document, 'IT');
  return schematronResult(rule, passed);
}
