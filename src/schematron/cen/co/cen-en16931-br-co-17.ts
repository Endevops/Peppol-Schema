import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule, vatCategoryTaxAmountMatchesRate } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-17',
  level: 'fatal',
  message: 'VAT category tax amount (BT-117) = VAT category taxable amount (BT-116) x (VAT category rate (BT-119) / 100), rounded to two decimals.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo17(document: PeppolDocument): boolean {
  const passed = document.taxTotals.every(total => (total.taxSubtotals ?? []).every(st => vatCategoryTaxAmountMatchesRate(st)));
  return passed;
}

export const validateCenEn16931BrCo17 = schematronRule(rule, evaluateCenEn16931BrCo17);
