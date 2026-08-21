import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { vatCategoryTaxAmountMatchesRate, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-17',
  level: 'fatal',
  message: 'VAT category tax amount (BT-117) = VAT category taxable amount (BT-116) x (VAT category rate (BT-119) / 100), rounded to two decimals.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo17(document: PeppolDocument): SchematronRuleResult {
  const passed = document.taxTotals.every(total => (total.taxSubtotals ?? []).every(st => vatCategoryTaxAmountMatchesRate(st)));
  return schematronResult(rule, passed);
}
