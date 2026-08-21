import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-03',
  level: 'fatal',
  message: 'Value added tax point date (BT-7) and Value added tax point date code (BT-8) are mutually exclusive.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo03(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.taxPointDate || !document.invoicePeriod?.descriptionCode;
  return schematronResult(rule, passed);
}
