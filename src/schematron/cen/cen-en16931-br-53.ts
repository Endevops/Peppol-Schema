import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-53',
  level: 'fatal',
  message:
    'If the VAT accounting currency code (BT-6) is present, then the Invoice total VAT amount in accounting currency (BT-111) shall be provided.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br53(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.taxCurrencyCode || document.taxTotals.some(total => total.taxAmount.currencyId === document.taxCurrencyCode);
  return schematronResult(rule, passed);
}
