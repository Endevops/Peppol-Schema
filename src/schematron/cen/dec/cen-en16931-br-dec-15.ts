import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-15',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice total VAT amount in accounting currency (BT-111) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec15(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !document.taxCurrencyCode ||
    document.taxTotals.every(total => total.taxAmount.currencyId !== document.taxCurrencyCode || hasMaxTwoDecimals(total.taxAmount.value));
  return schematronResult(rule, passed);
}
