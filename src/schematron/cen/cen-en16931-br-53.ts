import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-53',
  level: 'fatal',
  message:
    'If the VAT accounting currency code (BT-6) is present, then the Invoice total VAT amount in accounting currency (BT-111) shall be provided.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br53(document: PeppolDocument): boolean {
  const passed = !document.taxCurrencyCode || document.taxTotals.some(total => total.taxAmount.currencyId === document.taxCurrencyCode);
  return passed;
}

export const validateCenEn16931Br53 = schematronRule(rule, evaluateCenEn16931Br53);
